<?php

$servername = "localhost";
$dbname = "login";
$user = "root";
$pass = "";



try {
    $pdoConnection = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    // echo "Conectado<br>";
    // foreach($pdoConnection->query('SELECT * from colores') as $row) {
    //     print_r($row);
    // }
    // $pdoConnection = null;
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}


?>