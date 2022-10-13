<?php

// import the file and check it only the first time used.
require_once "pdo_connection.php";

// Write the sql sentence
$sql_insert_alumno = "insert into alumnos(nif, nombre, apellido, ciudad, fecha_nacimiento, sexo)
                    values ('11111111Z', 'pedro', 'picapiedra', 'new york', '0001-09-09', 'H');";

try{
    $insert_alumnos = $pdoConnection->prepare($sql_insert_alumno);
    $insert_alumnos->execute();
}
catch (Exception $e){
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}

$pdoConnection = null;
$resultado_insert_alumnos = null;
?>