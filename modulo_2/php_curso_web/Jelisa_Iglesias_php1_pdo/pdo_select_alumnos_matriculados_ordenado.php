<?php // Jelisa Iglesias


// import the file and check it only the first time used.
require_once "pdo_connection.php";

// Write the sql sentence
$sql_select = "SELECT DISTINCT * FROM alumno_asignatura_curso, alumnos, curso_escolar WHERE alumno_asignatura_curso.id_alumno = alumnos.id_alumno AND alumno_asignatura_curso.id_curso = curso_escolar.id_curso ORDER BY curso_escolar.anyo_inicio DESC;";

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