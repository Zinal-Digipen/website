<?php
// Set headers to discourage caching and frame embedding
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("X-Frame-Options: DENY");

// Check if the request is coming from a known browser
$user_agent = $_SERVER['HTTP_USER_AGENT'];
if (strpos($user_agent, 'bot') !== false) {
    // If the user agent contains 'bot', it might be a bot
    http_response_code(403); // Forbidden
    exit;
}

// Check if the request is coming too fast (rate limiting)
$requests_per_minute = 20; // Adjust as needed
$min_request_interval = 60 / $requests_per_minute;
$last_request_time = isset($_SESSION['last_request_time']) ? $_SESSION['last_request_time'] : 0;
$current_time = microtime(true);
if ($current_time - $last_request_time < $min_request_interval) {
    http_response_code(429); // Too Many Requests
    exit;
}

// Record the current request time
$_SESSION['last_request_time'] = $current_time;