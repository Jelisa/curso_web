<?php

$servername = "localhost";
$dbname = "curso_web";
$user = "root";
$pass = "";



try {
    // $pdoConnection = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")); // Para añadir acentos
    $pdoConnection = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass);
    echo "Conectado<br>";
    // foreach($pdoConnection->query('SELECT * from colores') as $row) {
    //     print_r($row);
    // }
    // $pdoConnection = null;
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}


?>