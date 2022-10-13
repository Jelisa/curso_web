<?php

// import the file and check it only the first time used.
require_once "pdo_connection.php";

// Write the sql sentence
$sql_select = "SELECT * FROM alumnos;";

try{
    $consulta_alumnos = $pdoConnection->prepare($sql_select);
    $consulta_alumnos->execute();

    $resultado_consulta_alumnos = $consulta_alumnos->fetchAll();
}
catch (Exception $e){
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}

// var_dump($resultado_consulta_alumnos);
print_r($resultado_consulta_alumnos);

$pdoConnection = null;
$resultado_consulta_alumnos = null;
?>