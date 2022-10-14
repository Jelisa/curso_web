<?php

$servername = "localhost";
$dbname = "curso_web";
$user = "root";
$pass = "";



try {
    $pdoConnection = new PDO("mysql:host=$servername;dbname=$dbname", $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    // echo "Conectado<br>";
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}


?>