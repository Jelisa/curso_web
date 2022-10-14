<?php // Jelisa Iglesias

// import the file and check it only the first time used.
require_once "pdo_connection.php";
require_once "pdo_functions.php";
 
$nombre_profesor = "Alejandro";
$apellido_profesor = "Kohler";

$profesor_id = checkValueExistance($pdoConnection,"id_profesor", "profesores", 'nombre', $nombre_profesor, 'apellido1', $apellido_profesor );

if (!$profesor_id){
    print "The desired profesor isn't present on the table";
    $pdoConnection = null;
    die();
}
else{
    // Perform a Delete of the professor.
    $sql_delete = "DELETE FROM profesores where id_profesor = '$profesor_id[0]';";
    echo "$sql_delete<br>";
    executeSQLInstruction($sql_delete, $pdoConnection);
    $pdoConnection = null;
}





?>