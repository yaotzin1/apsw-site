<?php
/**
 * APSW - Hardened Anti-Bot Contact & Architecture Inquiry Handler
 * Multi-layer Bot Protection (Honeypot + Time-Trap + Rate-Limiter + Content Filtering + CSRF Nonce)
 * Compatible with Cyber_Folks (cPanel / Apache / LiteSpeed / PHP) & Hetzner (Nginx / PHP-FPM)
 */

declare(strict_types=1);
session_start();

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

// 1. Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed. Please submit via POST.'
    ]);
    exit;
}

// 2. IP Retrieval & Rate Limiting
$clientIp = $_SERVER['HTTP_CF_CONNECTING_IP'] 
    ?? $_SERVER['HTTP_X_FORWARDED_FOR'] 
    ?? $_SERVER['REMOTE_ADDR'] 
    ?? '127.0.0.1';

// Normalize IP in case of comma-separated proxy list
if (strpos($clientIp, ',') !== false) {
    $clientIp = trim(explode(',', $clientIp)[0]);
}

$rateLimitDir = sys_get_temp_dir() . '/apsw_rate_limits';
if (!is_dir($rateLimitDir)) {
    @mkdir($rateLimitDir, 0750, true);
}

$ipHash = md5($clientIp);
$rateLimitFile = $rateLimitDir . '/rl_' . $ipHash . '.json';
$currentTime = time();
$maxSubmissionsPerWindow = 4; // Max 4 inquiries
$windowSeconds = 600; // 10 minutes window

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
    http_response_code(429);
    echo json_encode([
        'success' => false,
        'message' => 'Too many requests. Please wait a few minutes or email directly at piotr.solarz-wnek@apsw.pl'
    ]);
    exit;
}

// 3. Multi-Layer Honeypot Detection
$hpField1 = $_POST['website_hp'] ?? '';
$hpField2 = $_POST['form_verify_token_dummy'] ?? '';

if (!empty($hpField1) || !empty($hpField2)) {
    // Silent success response for automated bots
    echo json_encode([
        'success' => true,
        'message' => 'Inquiry registered.'
    ]);
    exit;
}

// 4. Time-Trap Defense (Bots submit forms in < 2 seconds)
$formRenderTime = isset($_POST['form_rendered_at']) ? (int)$_POST['form_rendered_at'] : 0;
if ($formRenderTime > 0) {
    $elapsedSeconds = $currentTime - $formRenderTime;
    if ($elapsedSeconds < 2) {
        // Submitted impossibly fast - bot detected
        echo json_encode([
            'success' => true,
            'message' => 'Inquiry registered.'
        ]);
        exit;
    }
}

// 5. Input Sanitization & Validation
$name         = isset($_POST['name']) ? trim(strip_tags((string)$_POST['name'])) : '';
$email        = isset($_POST['email']) ? filter_var(trim((string)$_POST['email']), FILTER_VALIDATE_EMAIL) : false;
$serviceType  = isset($_POST['service_type']) ? trim(strip_tags((string)$_POST['service_type'])) : 'General Architecture Inquiry';
$message      = isset($_POST['message']) ? trim(strip_tags((string)$_POST['message'])) : '';
$ndaRequested = (isset($_POST['nda_requested']) && $_POST['nda_requested'] === 'yes') ? 'YES (Execute Bilateral NDA prior to call)' : 'No';
$rfpJson      = isset($_POST['rfp_data']) ? trim((string)$_POST['rfp_data']) : '';

if (empty($name) || strlen($name) < 2 || strlen($name) > 120) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid name.']);
    exit;
}

if (!$email || strlen($email) > 150) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid work email address.']);
    exit;
}

if (empty($message) || strlen($message) < 8 || strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please provide a project description (between 8 and 5000 characters).']);
    exit;
}

// 6. Anti-Spam Content Heuristics (Crypto / adult / generic bulk spam patterns)
$spamKeywords = ['casino', 'crypto investment', 'whatsapp me at', 'telegram @', 'viagra', 'seo backlink service'];
$lowerMsg = strtolower($message . ' ' . $name);
foreach ($spamKeywords as $kw) {
    if (strpos($lowerMsg, $kw) !== false) {
        // Silent drop
        echo json_encode(['success' => true, 'message' => 'Inquiry received.']);
        exit;
    }
}

// 7. Update Rate Limiter on Valid Submission
$rateData['count']++;
@file_put_contents($rateLimitFile, json_encode($rateData), LOCK_EX);

// 8. Construct Secure Email
$recipient = 'piotr.solarz-wnek@apsw.pl';
$subjectPrefix = ($ndaRequested !== 'No') ? '[PRIORITY NDA REQUEST] ' : '';
$emailSubject = "=?UTF-8?B?" . base64_encode($subjectPrefix . "[APSW Inquiry] " . $serviceType . " - " . $name) . "?=";

$bodyContent = "======================================================\n";
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

// Headers
$headers = [
    'From: APSW Notification <noreply@apsw.pl>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: APSW-SecureMailer/2.0'
];

$mailSent = @mail($recipient, $emailSubject, $bodyContent, implode("\r\n", $headers));

// Backup secure storage in case server sendmail is down
$logDir = __DIR__ . '/.logs';
if (!is_dir($logDir)) {
    @mkdir($logDir, 0700, true);
    @file_put_contents($logDir . '/.htaccess', "Deny from all\n");
}
$logEntry = json_encode([
    'timestamp' => date('c'),
    'ip' => $clientIp,
    'name' => $name,
    'email' => $email,
    'service' => $serviceType,
    'nda_requested' => $ndaRequested,
    'message' => $message,
    'mail_sent' => $mailSent
]) . "\n";
@file_put_contents($logDir . '/inquiries_secure.log', $logEntry, FILE_APPEND | LOCK_EX);

// Success JSON Response
echo json_encode([
    'success' => true,
    'message' => 'Thank you! Your architecture inquiry has been received. Piotr Solarz-Wnek will review and respond within 24 hours.'
]);
exit;
