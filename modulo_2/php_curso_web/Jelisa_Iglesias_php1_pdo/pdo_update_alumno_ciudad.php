<?php // Jelisa Iglesias

// import the file and check it only the first time used.
require_once "pdo_connection.php";
require_once "pdo_functions.php";
 
$nif = "79089577Y";
$new_city = "Paris";

$alumno_id = checkValueExistance($pdoConnection,"id_alumno", "alumnos", 'nif', $nif );

var_dump($alumno_id);

// Perform an Update of the asignatura to assign it to the newly introduced professor.
$sql_update = "UPDATE alumnos set ciudad = '$new_city' where id_alumno = '$alumno_id[0]';";
executeSQLInstruction($sql_update, $pdoConnection);


$pdoConnection = null;


?>