<?php
require_once 'config.php'; // Database setting constants [DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD]

class dbHelper {
	private $db;
	private $err;
	function __construct() {
		$dsn = 'mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8';
		try {
			$this->db = new PDO($dsn, DB_USERNAME, DB_PASSWORD, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
		} catch (PDOException $e) {
			$response["status"] = "error";
			$response["message"] = 'Connection failed: ' . $e->getMessage();
			$response["data"] = null;
			//echoResponse(200, $response);
			exit;
		}
	}
     
	function select($table, $columns, $where, $order){
		try{
			$a = array();
			$w = "";
			foreach ($where as $key => $value) {
				$w .= " and " .$key. " like :".$key;
				$a[":".$key] = $value;
			}

			$stmt = $this->db->prepare("select ".$columns." from `".$table."` where 1=1 ". $w." ".$order);
			$stmt->execute($a);
			$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if(count($rows)<=0){
				$response["status"] = "warning";
				$response["message"] = "No data found.";
			}else{
				$response["status"] = "success";
				$response["message"] = "Data selected from database";
			}
			$response["data"] = $rows;
		}catch(PDOException $e){
			$response["status"] = "error";
			$response["message"] = 'Select Failed: ' .$e->getMessage();
			$response["data"] = null;
		}
		return $response;
	}

	function insert($table, $data) {
		try {
			$c = ""; // columns
			$b = ""; // bindings
			$v = array(); // values

			foreach ($data as $key => $value) {
				$c .= $key . ", ";
				$b .= ":". $key . ", ";
				$v[":".$key] = $value;
			}

			$c = substr($c, 0, -2); // remove last two chars
			$b = substr($b, 0, -2); // remove last two chars

			$stmt = $this->db->prepare("INSERT INTO $table ($c) VALUES ($b)");
			$stmt->execute($v);

			$id = $this->db->lastInsertId();

			$response["status"] = "success";
			$response["message"] ="Data inserted";
			$response["data"] = $id;
		} catch (PDOException $e) {
			$response["status"] = "error";
			$response["message"] = 'insert failed: ' .$e->getMessage();
			$response["data"] = null;
		}

		return $response;
	}

	function query($q) {
		try {
			$stmt = $this->db->query($q, PDO::FETCH_ASSOC);
			$stmt->execute();
			$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

			if (count($rows) <= 0) {
				$response["status"] = "warning";
				$response["message"] = "No data found.";
			} else {
				$response["status"] = "success";
				$response["message"] = "Data selected from database";
			}
			$response["data"] = $rows;
		} catch (PDOException $e) {
			$response["status"] = "error";
			$response["message"] = 'Select Failed: ' .$e->getMessage();
			$response["data"] = null;
		}

		return $response;
	}
}
 
?>
