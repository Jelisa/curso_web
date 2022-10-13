<?php

// import the file and check it only the first time used.
require_once "pdo_connection.php";

// Write the sql sentence
$sql_update_alumno = "UPDATE alumnos set ciudad = 'Miami' where nif ='11111111Z'";

try{
    $update_alumnos = $pdoConnection->prepare($sql_update_alumno);
    $update_alumnos->execute();
}
catch (Exception $e){
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}

$pdoConnection = null;
?>