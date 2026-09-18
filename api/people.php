<?php
/**
 * APSW - apsw-gridwright REST Data Source & Inline Editing Backend
 * 
 * Wire format compliant with apsw-gridwright specification:
 * - Query: page (1-based), pageSize, sort=col:asc,other:desc, search, filters (JSON array)
 * - Windowed Query: offset, limit
 * - Response: { data: [...], total: int, page: int, pageSize: int }, with X-Total-Count header
 * - Edit: PATCH /api/people/{id} with JSON body -> HTTP 200 on success, HTTP 422 on validation failure
 * - Master-Detail: GET /api/people/{id}/orders
 * 
 * @license MIT
 */

declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// CORS & Security Headers
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Range');
header('Access-Control-Expose-Headers: X-Total-Count, Content-Range');

// Preflight OPTIONS handling
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/**
 * Generates initial realistic seed dataset of 100 enterprise professionals
 */
function getInitialSeedData(): array {
    $firstNames = [
        'Alexander', 'Elena', 'Marcus', 'Sophia', 'Julian', 'Claire', 'David', 'Sarah',
        'Thomas', 'Olivia', 'Victor', 'Amelia', 'Nikolai', 'Hannah', 'Mateusz', 'Zofia',
        'Liam', 'Emma', 'Noah', 'Mia', 'Lucas', 'Charlotte', 'Benjamin', 'Isabella',
        'Henry', 'Harper', 'Sebastian', 'Evelyn', 'Daniel', 'Abigail', 'Gabriel', 'Emily'
    ];
    $lastNames = [
        'Vance', 'Lindqvist', 'Sterling', 'Chen', 'Dubois', 'Kowalski', 'Novak', 'Mercer',
        'Blackwood', 'Thornton', 'Holt', 'Sinclair', 'Moreau', 'Adler', 'Watanabe', 'Fischer',
        'Bergman', 'Castillo', 'Nakamura', 'Larsson', 'Fontaine', 'Vogel', 'Gauthier', 'Zimmerman'
    ];
    $departments = ['Engineering', 'Architecture', 'Security', 'Data & AI', 'Product', 'Infrastructure'];
    $roles = [
        'Engineering' => ['Senior Staff Engineer', 'Principal Distributed Systems Engineer', 'Fullstack Lead', 'Rust Systems Specialist'],
        'Architecture' => ['Enterprise Solution Architect', 'Cloud Platform Architect', 'Domain Architect', 'Chief Technical Architect'],
        'Security' => ['AppSec Lead', 'Zero-Trust Security Auditor', 'Cryptography Engineer', 'Compliance Architect'],
        'Data & AI' => ['Principal AI Engineer', 'Databricks ML Specialist', 'Lead Data Platform Architect', 'AI Governance Lead'],
        'Product' => ['VP Product Engineering', 'Director of Technical Product', 'Staff Technical Product Manager'],
        'Infrastructure' => ['Principal Site Reliability Engineer', 'Cloud Network Architect', 'Kubernetes Platform Lead']
    ];
    $statuses = ['Active', 'Active', 'Active', 'On Leave', 'Consulting'];

    $people = [];
    mt_srand(42); // Deterministic seed for reproducible testing

    for ($i = 1; $i <= 100; $i++) {
        $fn = $firstNames[array_rand($firstNames)];
        $ln = $lastNames[array_rand($lastNames)];
        $name = "$fn $ln";
        $dept = $departments[array_rand($departments)];
        $deptRoles = $roles[$dept];
        $role = $deptRoles[array_rand($deptRoles)];
        $status = $statuses[array_rand($statuses)];
        $salary = 95000 + (mt_rand(0, 150) * 1000); // 95k - 245k
        $rating = round(3.8 + (mt_rand(0, 12) * 0.1), 1);
        $lineCount = ($i % 3 === 0) ? mt_rand(1, 5) : 0;
        $canEditPay = ($i % 4 !== 0); // 75% are editable
        $startYear = mt_rand(2018, 2025);
        $startMonth = str_pad((string)mt_rand(1, 12), 2, '0', STR_PAD_LEFT);
        $startDay = str_pad((string)mt_rand(1, 28), 2, '0', STR_PAD_LEFT);

        $people[] = [
            'id' => $i,
            'uuid' => sprintf('usr-%04d-%s', $i, substr(md5("$name-$i"), 0, 8)),
            'name' => $name,
            'email' => strtolower(preg_replace('/[^a-zA-Z0-9]/', '.', "$fn.$ln")) . '@apsw.io',
            'department' => $dept,
            'role' => $role,
            'salary' => $salary,
            'status' => $status,
            'rating' => $rating,
            'canEditPay' => $canEditPay,
            'lineCount' => $lineCount,
            'startDate' => "$startYear-$startMonth-$startDay"
        ];
    }

    return $people;
}

/**
 * Retrieve current dataset from session or initialize seed
 */
function getDataset(): array {
    if (!isset($_SESSION['apsw_gridwright_people']) || !is_array($_SESSION['apsw_gridwright_people'])) {
        $_SESSION['apsw_gridwright_people'] = getInitialSeedData();
    }
    return $_SESSION['apsw_gridwright_people'];
}

/**
 * Save updated dataset into session
 */
function saveDataset(array $people): void {
    $_SESSION['apsw_gridwright_people'] = $people;
}

// Route detection: supports both PATH_INFO (/api/people/42) and ?id=42
$pathInfo = $_SERVER['PATH_INFO'] ?? '';
if (empty($pathInfo) && isset($_SERVER['REQUEST_URI'])) {
    $uriPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '';
    if (preg_match('#/api/people(?:\.php)?(?:/(.*))?$#', $uriPath, $matches)) {
        $pathInfo = isset($matches[1]) && $matches[1] !== '' ? '/' . $matches[1] : '';
    }
}

$segments = array_values(array_filter(explode('/', trim($pathInfo, '/'))));
$targetId = null;
$subResource = null;

if (!empty($segments)) {
    if (is_numeric($segments[0])) {
        $targetId = (int)$segments[0];
        $subResource = $segments[1] ?? null;
    } elseif ($segments[0] === 'reset') {
        $subResource = 'reset';
    }
}

if ($targetId === null && isset($_GET['id']) && is_numeric($_GET['id'])) {
    $targetId = (int)$_GET['id'];
}

$action = $_GET['action'] ?? null;
if ($action === 'reset' || $subResource === 'reset') {
    $_SESSION['apsw_gridwright_people'] = getInitialSeedData();
    echo json_encode([
        'success' => true,
        'message' => 'Dataset reset to original 100 enterprise seed rows.',
        'count' => 100
    ]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

// --------------------------------------------------------------------------
// 1. SUB-RESOURCE: MASTER-DETAIL ORDERS (GET /api/people/{id}/orders)
// --------------------------------------------------------------------------
if ($targetId !== null && ($subResource === 'orders' || ($_GET['subresource'] ?? '') === 'orders')) {
    if ($method !== 'GET') {
        http_response_code(405);
        echo json_encode(['error' => 'Method Not Allowed']);
        exit;
    }
    
    $people = getDataset();
    $found = null;
    foreach ($people as $p) {
        if ($p['id'] === $targetId) {
            $found = $p;
            break;
        }
    }

    if ($found === null) {
        http_response_code(404);
        echo json_encode(['error' => "Person ID {$targetId} not found"]);
        exit;
    }

    $orders = [];
    $orderCount = max(1, $found['lineCount']);
    $projects = [
        'Tier-1 Core Banking Modernization', 'Autonomous Multi-Agent Synthesizer',
        'Industrial Telemetry Pipeline', 'Enterprise Zero-Trust IAM Migration',
        'Databricks Feature Store Integration', 'CQRS Event-Store Optimization'
    ];

    for ($o = 1; $o <= $orderCount; $o++) {
        $orders[] = [
            'id' => sprintf('ENG-%03d-%02d', $targetId, $o),
            'project' => $projects[($targetId + $o) % count($projects)],
            'role' => $found['role'],
            'allocatedHours' => 40 * $o,
            'budget' => number_format($o * 12500, 2, '.', ''),
            'status' => ($o === 1) ? 'Active' : (($o === 2) ? 'Delivered' : 'Planned'),
            'approvedBy' => 'Piotr Solarz-Wnęk (APSW)'
        ];
    }

    echo json_encode([
        'personId' => $targetId,
        'personName' => $found['name'],
        'orders' => $orders
    ]);
    exit;
}

// --------------------------------------------------------------------------
// 2. INLINE EDITING: PATCH /api/people/{id}
// --------------------------------------------------------------------------
if ($method === 'PATCH' || ($method === 'POST' && ($_POST['_method'] ?? '') === 'PATCH')) {
    if ($targetId === null) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing person ID for PATCH edit']);
        exit;
    }

    $rawInput = file_get_contents('php://input');
    $payload = json_decode($rawInput, true);

    if (!is_array($payload)) {
        http_response_code(400);
        echo json_encode(['error' => 'Malformed JSON body']);
        exit;
    }

    $people = getDataset();
    $personIndex = -1;
    for ($i = 0; $i < count($people); $i++) {
        if ($people[$i]['id'] === $targetId) {
            $personIndex = $i;
            break;
        }
    }

    if ($personIndex === -1) {
        http_response_code(404);
        echo json_encode(['error' => "Person ID {$targetId} not found"]);
        exit;
    }

    $person = $people[$personIndex];

    if (array_key_exists('salary', $payload)) {
        $newSalary = $payload['salary'];
        if (!is_numeric($newSalary)) {
            http_response_code(422);
            echo json_encode([
                'error' => 'Validation Error: Salary must be a valid number.',
                'field' => 'salary'
            ]);
            exit;
        }
        $newSalary = (float)$newSalary;
        if ($newSalary < 0) {
            http_response_code(422);
            echo json_encode([
                'error' => 'Validation Error: Salary cannot be negative.',
                'field' => 'salary'
            ]);
            exit;
        }
        if ($newSalary > 2000000) {
            http_response_code(422);
            echo json_encode([
                'error' => 'Validation Error: Salary exceeds maximum enterprise threshold ($2,000,000).',
                'field' => 'salary'
            ]);
            exit;
        }
        if (!$person['canEditPay']) {
            http_response_code(403);
            echo json_encode([
                'error' => "Permission Denied: User {$person['name']} does not have canEditPay privileges.",
                'field' => 'salary'
            ]);
            exit;
        }
        $person['salary'] = $newSalary;
    }

    if (array_key_exists('name', $payload)) {
        $newName = trim((string)$payload['name']);
        if (strlen($newName) < 2) {
            http_response_code(422);
            echo json_encode(['error' => 'Name must be at least 2 characters.', 'field' => 'name']);
            exit;
        }
        $person['name'] = htmlspecialchars($newName, ENT_QUOTES, 'UTF-8');
    }

    if (array_key_exists('role', $payload)) {
        $person['role'] = htmlspecialchars(trim((string)$payload['role']), ENT_QUOTES, 'UTF-8');
    }

    if (array_key_exists('status', $payload)) {
        $validStatuses = ['Active', 'On Leave', 'Consulting'];
        $newStatus = trim((string)$payload['status']);
        if (in_array($newStatus, $validStatuses, true)) {
            $person['status'] = $newStatus;
        }
    }

    $people[$personIndex] = $person;
    saveDataset($people);

    echo json_encode([
        'success' => true,
        'message' => "Person #{$targetId} successfully updated.",
        'data' => $person
    ]);
    exit;
}

// --------------------------------------------------------------------------
// 3. SINGLE RECORD: GET /api/people/{id}
// --------------------------------------------------------------------------
if ($targetId !== null && $method === 'GET') {
    $people = getDataset();
    foreach ($people as $p) {
        if ($p['id'] === $targetId) {
            echo json_encode(['data' => $p]);
            exit;
        }
    }
    http_response_code(404);
    echo json_encode(['error' => "Person ID {$targetId} not found"]);
    exit;
}

// --------------------------------------------------------------------------
// 4. COLLECTION QUERY: GET /api/people
// --------------------------------------------------------------------------
if ($method !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$people = getDataset();

// A. Full-text search (?search=...)
$search = trim((string)($_GET['search'] ?? ''));
if ($search !== '') {
    $searchLower = mb_strtolower($search, 'UTF-8');
    $people = array_values(array_filter($people, function ($p) use ($searchLower) {
        return (
            strpos(mb_strtolower((string)$p['name'], 'UTF-8'), $searchLower) !== false ||
            strpos(mb_strtolower((string)$p['email'], 'UTF-8'), $searchLower) !== false ||
            strpos(mb_strtolower((string)$p['role'], 'UTF-8'), $searchLower) !== false ||
            strpos(mb_strtolower((string)$p['department'], 'UTF-8'), $searchLower) !== false
        );
    }));
}

// B. Structured JSON filters (?filters=[{"columnId":"department","operator":"eq","value":"Engineering"}])
$filtersParam = $_GET['filters'] ?? null;
if (!empty($filtersParam)) {
    $filters = is_string($filtersParam) ? json_decode($filtersParam, true) : $filtersParam;
    if (is_array($filters)) {
        foreach ($filters as $f) {
            if (!isset($f['columnId'], $f['value'])) continue;
            $col = $f['columnId'];
            $op = strtolower((string)($f['operator'] ?? 'eq'));
            $val = $f['value'];

            $people = array_values(array_filter($people, function ($row) use ($col, $op, $val) {
                if (!array_key_exists($col, $row)) return true;
                $cell = $row[$col];

                switch ($op) {
                    case 'eq':
                        return is_numeric($cell) && is_numeric($val) ? ((float)$cell === (float)$val) : (strcasecmp((string)$cell, (string)$val) === 0);
                    case 'neq':
                        return is_numeric($cell) && is_numeric($val) ? ((float)$cell !== (float)$val) : (strcasecmp((string)$cell, (string)$val) !== 0);
                    case 'contains':
                        return strpos(mb_strtolower((string)$cell, 'UTF-8'), mb_strtolower((string)$val, 'UTF-8')) !== false;
                    case 'gt':
                        return (float)$cell > (float)$val;
                    case 'gte':
                        return (float)$cell >= (float)$val;
                    case 'lt':
                        return (float)$cell < (float)$val;
                    case 'lte':
                        return (float)$cell <= (float)$val;
                    case 'in':
                        $list = is_array($val) ? $val : explode(',', (string)$val);
                        return in_array((string)$cell, array_map('strval', $list), true);
                    default:
                        return true;
                }
            }));
        }
    }
}

// Simple direct query filters fallback (e.g. ?department=Architecture&status=Active)
$allowedParamFilters = ['department', 'status', 'canEditPay'];
foreach ($allowedParamFilters as $param) {
    if (isset($_GET[$param]) && $_GET[$param] !== '') {
        $filterVal = $_GET[$param];
        $people = array_values(array_filter($people, function ($row) use ($param, $filterVal) {
            if (!isset($row[$param])) return true;
            if ($param === 'canEditPay') {
                $boolVal = filter_var($filterVal, FILTER_VALIDATE_BOOLEAN);
                return $row[$param] === $boolVal;
            }
            return strcasecmp((string)$row[$param], (string)$filterVal) === 0;
        }));
    }
}

$totalRows = count($people);

// C. Multi-column Sorting (?sort=salary:desc,name:asc or ?sort=name:asc)
$sortParam = trim((string)($_GET['sort'] ?? ''));
if ($sortParam !== '') {
    $sortParts = explode(',', $sortParam);
    $sortInstructions = [];

    foreach ($sortParts as $part) {
        $chunks = explode(':', trim($part));
        $col = $chunks[0] ?? '';
        $dir = strtolower($chunks[1] ?? 'asc') === 'desc' ? SORT_DESC : SORT_ASC;
        if (in_array($col, ['id', 'name', 'email', 'department', 'role', 'salary', 'status', 'rating', 'startDate'], true)) {
            $sortInstructions[] = ['col' => $col, 'dir' => $dir];
        }
    }

    if (!empty($sortInstructions)) {
        usort($people, function ($a, $b) use ($sortInstructions) {
            foreach ($sortInstructions as $rule) {
                $col = $rule['col'];
                $dir = $rule['dir'];
                $valA = $a[$col] ?? null;
                $valB = $b[$col] ?? null;

                if ($valA === $valB) continue;

                if (is_numeric($valA) && is_numeric($valB)) {
                    $cmp = ($valA < $valB) ? -1 : 1;
                } else {
                    $cmp = strnatcasecmp((string)$valA, (string)$valB);
                }

                return ($dir === SORT_DESC) ? -$cmp : $cmp;
            }
            return 0;
        });
    }
}

// D. Pagination & Windowing
$offset = null;
$limit = null;

if (isset($_GET['offset']) && is_numeric($_GET['offset'])) {
    $offset = max(0, (int)$_GET['offset']);
    $limit = isset($_GET['limit']) && is_numeric($_GET['limit']) ? max(1, min(200, (int)$_GET['limit'])) : 25;
    $page = (int)floor($offset / $limit) + 1;
    $pageSize = $limit;
} else {
    $page = max(1, (int)($_GET['page'] ?? 1));
    $pageSize = max(1, min(100, (int)($_GET['pageSize'] ?? 25)));
    $offset = ($page - 1) * $pageSize;
    $limit = $pageSize;
}

$pagedData = array_slice($people, $offset, $limit);
$totalPages = (int)ceil($totalRows / $pageSize);

header("X-Total-Count: {$totalRows}");
header("Content-Range: items {$offset}-" . min($offset + $limit - 1, $totalRows) . "/{$totalRows}");

echo json_encode([
    'data' => $pagedData,
    'rows' => $pagedData,
    'total' => $totalRows,
    'totalRows' => $totalRows,
    'page' => $page,
    'pageSize' => $pageSize,
    'totalPages' => $totalPages,
    'offset' => $offset,
    'limit' => $limit
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
