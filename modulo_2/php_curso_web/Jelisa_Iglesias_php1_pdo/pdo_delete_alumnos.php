<?php

// import the file and check it only the first time used.
require_once "pdo_connection.php";

// Write the sql sentence
$sql_delete_alumno = "delete from alumnos where nif= '11111111Z'";

try{
    $delete_alumnos = $pdoConnection->prepare($sql_delete_alumno);
    $delete_alumnos->execute();
}
catch (Exception $e){
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}

$pdoConnection = null;


?>