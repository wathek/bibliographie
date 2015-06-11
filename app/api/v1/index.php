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

$app->get('/references', function() {
	global $db;

    $rows = $db->select("references", "id, date, type, editor, title, bookTitle", array(), "ORDER BY id DESC");
	$references = $rows["data"];

	foreach($references as &$ref) {
		// Récupération des auteurs
		$rows = $db->select("authors", "id, firstname, lastname, email", array("idReference" => $ref["id"]), "");
		$ref["author"] = $rows["data"];

		// Récupération des catégories
		$rows = $db->query("SELECT categories.name, categories.color
							FROM categories
							JOIN categoryreference ON categories.id = categoryreference.idCategory AND categoryreference.idReference = " . $ref["id"] . "
							ORDER BY categories.name");
		
		$ref["categories"] = $rows["data"];
	}
	
	echoResponse(200, $references);
});

function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}
 
$app->run();
?>
