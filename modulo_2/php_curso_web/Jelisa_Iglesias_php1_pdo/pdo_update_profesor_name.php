<?php // Jelisa Iglesias

// import the file and check it only the first time used.
require_once "pdo_connection.php";
require_once "pdo_functions.php";
 
$nombre_profesor = "Manolo";
$apellido_profesor = "Hamill";
$new_name = "Paco";

$profesor_id = checkValueExistance($pdoConnection,"id_profesor", "profesores", 'nombre', $nombre_profesor, 'apellido1', $apellido_profesor );



// Perform an Update of the asignatura to assign it to the newly introduced professor.
$sql_update = "UPDATE profesores set nombre = '$new_name' where id_profesor = '$profesor_id[0]';";
executeSQLInstruction($sql_update, $pdoConnection);


$pdoConnection = null;


?>