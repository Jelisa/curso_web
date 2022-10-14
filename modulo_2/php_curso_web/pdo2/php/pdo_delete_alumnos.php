<?php

// import the file and check it only the first time used.
include "pdo_connection.php";
include "pdo_functions.php";

function deleteStudentById($id, $connection){
    // Write the sql sentence
    $sql_delete_alumno = "delete from alumnos where id_alumno = $id'";
    executeSQLInstruction($sql_delete_alumno, $connection);
}

$data = file_get_contents("https://input");
// deleteStudentById($_POST['id'], $pdoConnection);
$pdoConnection = null;


?>