<?php
/**
 * APSW - Shared hardening helpers for the public form endpoints.
 *
 * Lives in a dot-directory: the root .htaccess blocks every HTTP path containing
 * "/.", and .security/.htaccess denies the directory a second time.
 */

declare(strict_types=1);

/**
 * Set to true ONLY when a trusted reverse proxy (Cloudflare, Nginx, Traefik)
 * sits in front of this app and OVERWRITES these headers. On shared hosting
 * they are supplied by the client, so trusting them lets any bot mint a fresh
 * rate-limit bucket per request and poison the logged IP.
 */
const APSW_TRUSTED_PROXY = false;

/** A human cannot read the form and submit inside two seconds. */
const APSW_TOKEN_MIN_AGE = 2;

/** A tab left open longer than this must reload before submitting. */
const APSW_TOKEN_MAX_AGE = 7200;

/**
 * HMAC key shared by form-token.php and contact.php, generated on first use.
 *
 * Stored as a .php file that returns the value rather than a plain key file: if
 * a web server ever serves this directory (one that ignores .htaccess), PHP
 * executes it and emits nothing instead of dumping the key.
 */
function apsw_form_secret(): string
{
    static $cached = null;

    if (is_string($cached)) {
        return $cached;
    }

    $path = __DIR__ . '/secret.key.php';

    if (is_readable($path)) {
        $secret = @include $path;
        if (is_string($secret) && strlen($secret) >= 32) {
            return $cached = $secret;
        }
    }

    $secret = bin2hex(random_bytes(32));
    @file_put_contents($path, '<?php return ' . var_export($secret, true) . ';' . PHP_EOL, LOCK_EX);
    @chmod($path, 0600);

    return $cached = $secret;
}

/**
 * The only IP we can trust is the one the TCP connection came from, unless a
 * trusted proxy is explicitly declared above.
 */
function apsw_client_ip(): string
{
    if (APSW_TRUSTED_PROXY) {
        $forwarded = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
        if ($forwarded !== '') {
            $first = trim(explode(',', $forwarded)[0]);
            if (filter_var($first, FILTER_VALIDATE_IP)) {
                return $first;
            }
        }
    }

    $remote = $_SERVER['REMOTE_ADDR'] ?? '';

    return filter_var($remote, FILTER_VALIDATE_IP) ? $remote : '0.0.0.0';
}

/** Server-issued, signed render timestamp. The client cannot forge or backdate it. */
function apsw_issue_form_token(): string
{
    $issuedAt = (string) time();

    return $issuedAt . '.' . hash_hmac('sha256', $issuedAt, apsw_form_secret());
}

/**
 * Verify a submitted token.
 *
 * @return string|null null when valid, otherwise a machine-readable reason code
 *                     the frontend can translate.
 */
function apsw_verify_form_token(mixed $token): ?string
{
    if (!is_string($token) || substr_count($token, '.') !== 1) {
        return 'form_token_missing';
    }

    [$issuedAt, $signature] = explode('.', $token, 2);

    if ($issuedAt === '' || !ctype_digit($issuedAt)) {
        return 'form_token_missing';
    }

    $expected = hash_hmac('sha256', $issuedAt, apsw_form_secret());
    if (!hash_equals($expected, $signature)) {
        return 'form_token_invalid';
    }

    $age = time() - (int) $issuedAt;

    if ($age < APSW_TOKEN_MIN_AGE) {
        return 'form_too_fast';
    }

    if ($age > APSW_TOKEN_MAX_AGE) {
        return 'form_token_expired';
    }

    return null;
}

/**
 * Strip CR, LF and tabs from any value destined for a mail header. This is the
 * sequence that turns a name field into an injected Bcc:.
 */
function apsw_header_safe(string $value): string
{
    return trim((string) preg_replace('/[\r\n\t\v\f]+/', ' ', $value));
}

/** Emit a JSON response and stop. */
function apsw_json(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}
