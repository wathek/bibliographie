<?php
require '.././vendor/autoload.php';
require_once 'dbHelper.php';
 
// Get Slim instance
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
 
// call our own dbHelper class
$db = new dbHelper();

 
/***
 * Categories
 ***/
$app->get('/categories', function() {
    global $db;

    $rows = $db->select("categories", "id,name,color,description", array(), "ORDER BY name");
    $categories = $rows["data"];

    echoResponse(200, $categories);
});

$app->post('/category/:name/:color', function($name, $color) {
	global $db;

	$name = trim($name);
	$color = trim($color);

	if (empty($name) || empty($color)) {
		echoResponse(400, array());
		return;
	}

	$result = $db->insert("categories", array("name" => $name, "color" => $color));

	echoResponse(200, array("status" => $result));
		
});


/***
 * References
 ***/
$app->get('/references', function() {
	global $db;

    $rows = $db->select("references", "id, date, type, editor, title, bookTitle", array(), "ORDER BY id DESC");
	$references = $rows["data"];

	$references = retrieveReferencesAuthorsAndCategories($references);

	echoResponse(200, $references);
});

$app->get('/references/:search', function($search) {
	global $db;
	
	$search = filter_var($search, FILTER_SANITIZE_STRING);

	if (!empty($search)) {
		$rows = $db->query("SELECT id, date, type, editor, title, bookTitle 
							FROM `references`
							WHERE title LIKE '%$search%'
							OR bookTitle LIKE '%$search%'
							OR editor LIKE '%$search%'
							OR type LIKE '%$search%'
							UNION
							SELECT `references`.id, `references`.date, `references`.type, `references`.editor, `references`.title, `references`.bookTitle
							FROM `references`
							JOIN authors ON authors.idReference = `references`.id AND (authors.email LIKE '%$search%' OR authors.firstname LIKE '%$search%' OR lastname LIKE '%$search%')
							ORDER BY id DESC");
	} else {
		$rows = $db->select("references", "id, date, type, editor, title, bookTitle", array(), "ORDER BY id DESC");
	}

	$references = $rows["data"];
	
	$references = retrieveReferencesAuthorsAndCategories($references);

	echoResponse(200, $references);

});


/***
 * Extra functions
 ***/
function retrieveReferencesAuthorsAndCategories($references) {
	global $db;

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
	
	return $references;
}

function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}
 
$app->run();
?>
