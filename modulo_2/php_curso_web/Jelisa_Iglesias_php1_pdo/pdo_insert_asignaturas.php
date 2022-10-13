<?php // Jelisa Iglesias

// import the file and check it only the first time used.
require_once "pdo_connection.php";

$asignaturas = ["NODE.JS", "Servidores", "Criptografía"]; // lista de asignatura a añadir
$nomprbre_profesor = "Esther";
$apellido_profesor = "Spencer";
$grado_nombre = "Desarrollo web avanzado";
$departamento = "Informatica";

function checkValueExistance(...$arguments){
    /** The function should receive at least 3 parameters, the first ons being a PDO connection.
     * 
     */
    if (count($arguments) < 3){
        print "The function checkValueExistance is missing paramenters";
        return False;
    }
    elseif (count($arguments) == 3){
        $sql_select = "SELECT $arguments[1] FROM $$arguments[2]";
    }
    else{
        $sql_select = "SELECT $arguments[1] FROM $arguments[2] WHERE ";
        for ($i=3; $i < count($arguments); $i++){
            if ($i == 3){
                $sql_select .= $arguments[$i]." = '".$arguments[++$i]."'";
            }
            else{
                $sql_select .= " AND ".$arguments[$i]." = '".$arguments[++$i]."'";
            }
        }
    }
    echo "$sql_select<br>";
    try{
        $select = $arguments[0]->prepare($sql_select);
        $select ->execute();
        $tableValue = $select ->fetch();
    }
    catch (Exception $e){
        print "Error !: $arguments[2] " . $e->getMessage() . "<br/>";
        die();
    }
    return $tableValue;
}

$profesor_id = checkValueExistance($pdoConnection,"id_profesor", "profesores", 'nombre', $nomprbre_profesor, 'apellido1', $apellido_profesor );
$grado_id = checkValueExistance($pdoConnection, 'id_grado', 'grado', 'nombre', $grado_nombre);
$departamento_id = checkValueExistance($pdoConnection, 'id_departamento', 'departamento', 'nombre', $departamento);

if ($profesor_id && $grado_id && $departamento_id){
    foreach ($asignaturas as $asignatura){
        $sql_insert_matricula = "INSERT INTO asignatura(nombre, id_profesor, id_grado, id_departamento) values ('$asignatura', '$profesor_id[0]', '$grado_id[0]', '$departamento_id[0]');";
        echo $sql_insert_matricula."<br>";
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

$pdoConnection = null;
$resultado_insert_alumnos = null;


?>