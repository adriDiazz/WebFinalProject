<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    header('Content-Type: application/json; charset=utf-8');

    require_once __DIR__ . "/src/ClubesController.php";
    require_once __DIR__ . "/src/UsersController.php";
    require_once __DIR__ . "/src/UserClubController.php";


    $parts = explode('/', $_SERVER['REQUEST_URI']);


    if ($parts[1] != "products" && $parts[1] != "users" && $parts[1] != "userclub") {
        http_response_code(404);
        exit;
    } 

    $dsn = "mysql:host=localhost;dbname=cluby;charset=utf8mb4";
    $pdo = new PDO($dsn, "root", "root", [
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_STRINGIFY_FETCHES => false
    ]);

    if ($parts[1] == "users") {
        $id = $parts[2] ?? null;

        $Userscontroller = new UsersController($pdo);
        $Userscontroller->processRequest($_SERVER['REQUEST_METHOD'], $id);
    } 

    if ($parts[1] == "userclub") {
        $id = $parts[2] ?? null;

        $Userclubcontroller = new UserclubController($pdo);
        $Userclubcontroller->processRequest($_SERVER['REQUEST_METHOD'], $id);
    }

    if ($parts[1] == "products") {
        $id = $parts[2] ?? null;
        $clubController = new ClubesController($pdo);
        $clubController->processRequest($_SERVER['REQUEST_METHOD'], $id);
    }

?>