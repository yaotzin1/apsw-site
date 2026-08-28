<?php
/**
 * APSW - Form Token Issuer
 *
 * index.html is static, so the signed render timestamp cannot be embedded at
 * render time. The page fetches it here instead. The token carries no secret
 * and no user data: it is a signed clock reading, so issuing it freely is safe.
 */

declare(strict_types=1);

require __DIR__ . '/.security/form_guard.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('X-Content-Type-Options: nosniff');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    apsw_json(405, ['success' => false, 'message' => 'Method Not Allowed.']);
}

apsw_json(200, [
    'success' => true,
    'token'   => apsw_issue_form_token(),
]);
