<?php
require '.././vendor/autoload.php';
require_once 'dbHelper.php';
 
// Get Slim instance
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
 
// call our own dbHelper class
$db = new dbHelper();

 
$app->get('/categories', function() {
    global $db;

    $rows = $db->select("categories", "id,name,color,description", array(), "ORDER BY name");
    $categories = $rows["data"];
	
    echoResponse(200, $categories);
});

function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}
 
$app->run();
?>
