<?php
/**
 * APSW - Hardened Anti-Bot Contact & Architecture Inquiry Handler
 *
 * Defence layers, in order of application:
 *   1. POST only
 *   2. Rate limiting, keyed on REMOTE_ADDR (proxy headers are opt-in, see form_guard.php)
 *   3. Two honeypot fields, answered with a silent success
 *   4. Server-issued HMAC-signed render token: cannot be forged, backdated or omitted
 *   5. Length-bounded input validation and sanitization
 *   6. Content heuristics, answered with a silent success
 *   7. CR/LF stripped from every value that reaches a mail header
 *
 * Failure responses carry a machine-readable `code` so the frontend can show a
 * translated message.
 *
 * Compatible with Cyber_Folks (cPanel / Apache / LiteSpeed / PHP 8.2+) and
 * Hetzner (Nginx / PHP-FPM).
 */

declare(strict_types=1);

require __DIR__ . '/.security/form_guard.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

// 1. Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    apsw_json(405, [
        'success' => false,
        'code'    => 'method_not_allowed',
        'message' => 'Method Not Allowed. Please submit via POST.',
    ]);
}

// 2. Rate limiting, keyed on the connecting address
$clientIp = apsw_client_ip();

$rateLimitDir = sys_get_temp_dir() . '/apsw_rate_limits';
if (!is_dir($rateLimitDir)) {
    @mkdir($rateLimitDir, 0750, true);
}

$currentTime             = time();
$maxSubmissionsPerWindow = 4;   // Max 4 inquiries
$windowSeconds           = 600; // 10 minute window

// Opportunistic sweep so the bucket directory cannot grow without bound.
if (random_int(1, 50) === 1) {
    foreach ((array) @glob($rateLimitDir . '/rl_*.json') as $stale) {
        if (@filemtime($stale) < $currentTime - ($windowSeconds * 2)) {
            @unlink($stale);
        }
    }
}

$rateLimitFile = $rateLimitDir . '/rl_' . hash('sha256', $clientIp) . '.json';

$rateData = ['count' => 0, 'first_attempt' => $currentTime];
if (file_exists($rateLimitFile)) {
    $raw = @file_get_contents($rateLimitFile);
    if ($raw) {
        $parsed = json_decode($raw, true);
        if (is_array($parsed) && ($currentTime - ($parsed['first_attempt'] ?? 0) < $windowSeconds)) {
            $rateData = $parsed;
        }
    }
}

if ($rateData['count'] >= $maxSubmissionsPerWindow) {
    apsw_json(429, [
        'success' => false,
        'code'    => 'rate_limited',
        'message' => 'Too many requests. Please wait a few minutes or email directly at piotr.solarz-wnek@apsw.pl',
    ]);
}

// 3. Multi-layer honeypot detection
$hpField1 = $_POST['website_hp'] ?? '';
$hpField2 = $_POST['form_verify_token_dummy'] ?? '';

if (!empty($hpField1) || !empty($hpField2)) {
    // Silent success response for automated bots
    apsw_json(200, ['success' => true, 'message' => 'Inquiry registered.']);
}

// 4. Signed render token. A missing token is a failure, not a skipped check.
$tokenError = apsw_verify_form_token($_POST['form_token'] ?? null);

if ($tokenError === 'form_too_fast') {
    // Submitted impossibly fast - bot. Answer as if accepted.
    apsw_json(200, ['success' => true, 'message' => 'Inquiry registered.']);
}

if ($tokenError !== null) {
    apsw_json(400, [
        'success' => false,
        'code'    => $tokenError,
        'message' => 'Could not verify this form session. Please reload the page and try again, '
                   . 'or email piotr.solarz-wnek@apsw.pl directly.',
    ]);
}

// 5. Input sanitization & validation
$name        = isset($_POST['name']) ? trim(strip_tags((string) $_POST['name'])) : '';
$email       = isset($_POST['email']) ? filter_var(trim((string) $_POST['email']), FILTER_VALIDATE_EMAIL) : false;
$serviceType = isset($_POST['service_type']) ? trim(strip_tags((string) $_POST['service_type'])) : '';
$message     = isset($_POST['message']) ? trim(strip_tags((string) $_POST['message'])) : '';
$rfpJson     = isset($_POST['rfp_data']) ? trim((string) $_POST['rfp_data']) : '';

$ndaRequested = (isset($_POST['nda_requested']) && $_POST['nda_requested'] === 'yes')
    ? 'YES (Execute Bilateral NDA prior to call)'
    : 'No';

if ($serviceType === '' || mb_strlen($serviceType) > 120) {
    $serviceType = 'General Architecture Inquiry';
}

if (empty($name) || mb_strlen($name) < 2 || mb_strlen($name) > 120) {
    apsw_json(400, [
        'success' => false,
        'code'    => 'invalid_name',
        'message' => 'Please provide a valid name.',
    ]);
}

if (!$email || strlen($email) > 150) {
    apsw_json(400, [
        'success' => false,
        'code'    => 'invalid_email',
        'message' => 'Please provide a valid work email address.',
    ]);
}

if (empty($message) || mb_strlen($message) < 8 || mb_strlen($message) > 5000) {
    apsw_json(400, [
        'success' => false,
        'code'    => 'invalid_message',
        'message' => 'Please provide a project description (between 8 and 5000 characters).',
    ]);
}

// The estimator payload is machine-generated; cap it so it cannot inflate the
// mail body or the log file.
if (mb_strlen($rfpJson) > 4000) {
    $rfpJson = mb_substr($rfpJson, 0, 4000) . ' [truncated]';
}

// 6. Anti-spam content heuristics (crypto / adult / generic bulk spam patterns)
$spamKeywords = ['casino', 'crypto investment', 'whatsapp me at', 'telegram @', 'viagra', 'seo backlink service'];
$lowerMsg     = mb_strtolower($message . ' ' . $name);
foreach ($spamKeywords as $keyword) {
    if (str_contains($lowerMsg, $keyword)) {
        // Silent drop
        apsw_json(200, ['success' => true, 'message' => 'Inquiry received.']);
    }
}

// 7. Update rate limiter on valid submission
$rateData['count']++;
@file_put_contents($rateLimitFile, json_encode($rateData), LOCK_EX);

// 8. Construct email. Every header value is CR/LF-stripped, and the headers are
//    passed to mail() as an array so PHP applies its own header validation.
$recipient     = 'piotr.solarz-wnek@apsw.pl';
$safeName      = apsw_header_safe($name);
$subjectPrefix = ($ndaRequested !== 'No') ? '[PRIORITY NDA REQUEST] ' : '';
$emailSubject  = '=?UTF-8?B?'
    . base64_encode($subjectPrefix . '[APSW Inquiry] ' . apsw_header_safe($serviceType) . ' - ' . $safeName)
    . '?=';

$bodyContent  = "======================================================\n";
$bodyContent .= "NEW ARCHITECTURE & AI INQUIRY (apsw.pl)\n";
$bodyContent .= "======================================================\n\n";
$bodyContent .= "Name / Organization: " . $name . "\n";
$bodyContent .= "Work Email:          " . $email . "\n";
$bodyContent .= "Service Track:       " . $serviceType . "\n";
$bodyContent .= "Mutual NDA Request:  " . $ndaRequested . "\n";
$bodyContent .= "Submission Time:     " . date('Y-m-d H:i:s T') . "\n";
$bodyContent .= "Client IP:           " . $clientIp . "\n\n";
$bodyContent .= "--- PROJECT DESCRIPTION ---\n";
$bodyContent .= $message . "\n\n";

if (!empty($rfpJson)) {
    $bodyContent .= "--- SCOPE / PARAMETERS ---\n";
    $bodyContent .= $rfpJson . "\n\n";
}
$bodyContent .= "======================================================\n";

$headers = [
    'From'         => 'APSW Notification <noreply@apsw.pl>',
    'Reply-To'     => $safeName . ' <' . $email . '>',
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'X-Mailer'     => 'APSW-SecureMailer/2.1',
];

// PHP validates array headers and throws on a malformed one. Sanitization above
// makes that unreachable, but a fatal here would break the JSON contract.
try {
    $mailSent = @mail($recipient, $emailSubject, $bodyContent, $headers);
} catch (ValueError $e) {
    $mailSent = false;
}

// 9. Backup secure storage in case server sendmail is down
$logDir = __DIR__ . '/.logs';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0700, true);
    @file_put_contents($logDir . '/.htaccess', "Require all denied\nDeny from all\n");
}

$logFile = $logDir . '/inquiries_secure.log';

// Rotate before appending so a flood cannot grow one file indefinitely.
if (file_exists($logFile) && @filesize($logFile) > 5 * 1024 * 1024) {
    @rename($logFile, $logDir . '/inquiries_secure-' . date('Ymd-His') . '.log');
}

$logEntry = json_encode([
    'timestamp'     => date('c'),
    'ip'            => $clientIp,
    'name'          => $name,
    'email'         => $email,
    'service'       => $serviceType,
    'nda_requested' => $ndaRequested,
    'message'       => $message,
    'mail_sent'     => $mailSent,
], JSON_UNESCAPED_UNICODE) . "\n";

@file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);

// 10. Success
apsw_json(200, [
    'success' => true,
    'message' => 'Thank you! Your architecture inquiry has been received. '
               . 'Piotr Solarz-Wnek will review and respond within 24 hours.',
]);
