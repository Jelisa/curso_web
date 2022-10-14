<?php // Jelisa Iglesias

// import the file and check it only the first time used.
require_once "pdo_connection.php";
require_once "pdo_functions.php";
 
$nif = "79089577Y";

$student_id = checkValueExistance($pdoConnection,"id_alumno", "alumnos", 'nif', $nif);

if (!$student_id){
    print "The desired profesor isn't present on the table";
    $pdoConnection = null;
    die();
}
else{
    // Perform a Delete of the student.
    $sql_delete = "DELETE FROM alumnos where id_alumno = '$student_id[0]';";
    echo "$sql_delete<br>";
    executeSQLInstruction($sql_delete, $pdoConnection);
    $pdoConnection = null;
}





?>