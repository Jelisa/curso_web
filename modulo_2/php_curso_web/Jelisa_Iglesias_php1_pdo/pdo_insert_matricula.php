<?php // Jelisa Iglesias

// import the file and check it only the first time used.
require_once "pdo_connection.php";

$nif = "11111121A"; // format [0-9]{8}[A-Z]
$nombre = "pepito";
$apellido = "grillo";
$ciudad = "disney";
$fecha_nacimiento = "0000-00-00"; // yyyy-mm-dd format
$sexo = "H"; // Pick H or M
$asignatura = "PHP";
$anyo_inicio = "2020";
$anyo_fin = "2021";

function checkValue($column, $table, $attribute, $valueToLookFor, $connection){
    $sql_select_asignatura = "select $column from $table where $attribute = '$valueToLookFor';";
    // echo "$sql_select_asignatura<br>";
    try{
        $select_asignatura = $connection->prepare($sql_select_asignatura);
        $select_asignatura->execute();
        $tableValue = $select_asignatura->fetch();
    }
    catch (Exception $e){
        print "Error !: $table " . $e->getMessage() . "<br/>";
        die();
    }
    return $tableValue;
}

$alumno_id = checkValue("id_alumno", "alumnos", 'nif', $nif, $pdoConnection);
if ($alumno_id){
    $asignatura_id = checkValue('id_asignatura',"asignatura",'nombre', $asignatura, $pdoConnection);
    if ($asignatura_id){
        $curso_id = checkValue('id_curso', 'curso_escolar', 'anyo_inicio', $anyo_inicio, $pdoConnection);
        if ($curso_id){
            $sql_insert_matricula = "INSERT INTO alumno_asignatura_curso(id_alumno, id_asignatura, id_curso) values ('$alumno_id[0]', '$asignatura_id[0]', '$curso_id[0]');";
            try{
                $insert_matricula = $pdoConnection->prepare($sql_insert_matricula);
                $insert_matricula->execute();
            }
            catch (Exception $e){
                print "Error matricula!: " . $e->getMessage() . "<br/>";
                die();
            }
        }
    }
}

$pdoConnection = null;
$resultado_insert_alumnos = null;


?>