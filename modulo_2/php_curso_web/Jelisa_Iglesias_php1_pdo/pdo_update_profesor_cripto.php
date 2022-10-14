<?php // Jelisa Iglesias

// import the file and check it only the first time used.
require_once "pdo_connection.php";
require_once "pdo_functions.php";

$nombre_profesor = "John";
$apellido_profesor = "Le Carre";
$classe = "criptografia";

$profesor_id = checkValueExistance($pdoConnection,"id_profesor", "profesores", 'nombre', $nombre_profesor, 'apellido1', $apellido_profesor );



// We get the id_asignatura of the class to be able to perform a safe update.
$class_id = checkValueExistance($pdoConnection, "id_asignatura", 'asignatura', 'nombre', $classe);

// Perform an Update of the asignatura to assign it to the newly introduced professor.
$sql_update = "UPDATE asignatura set id_profesor = '$profesor_id[0]' where id_asignatura = '$class_id[0]';";
executeSQLInstruction($sql_update, $pdoConnection);


$pdoConnection = null;


?>