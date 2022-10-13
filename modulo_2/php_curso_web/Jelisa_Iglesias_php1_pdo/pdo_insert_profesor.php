<?php // Jelisa Iglesias

// import the file and check it only the first time used.
require_once "pdo_connection.php";

$nombre_profesor = "John";
$apellido_profesor = "Le Carre";
$classe = "NODE.JS";

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
        $sql_select = "SELECT $arguments[1] FROM $arguments[2] WHERE $arguments[3] = '$arguments[4]'";
        for ($i=5; $i < count($arguments); $i++){
            $sql_select .= " AND ".$arguments[$i]." = '".$arguments[++$i]."'";
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

function insertValue(...$arguments){
    /** A function to insert values into a DB it should have at least four parameters, being:
     * -the first a PDO connection object
     * - The second the name of the table
     * - The following parameters should be given in pairs of columnName and Value
     */
    if (count($arguments) < 4){
        print "The function insertValue is missing paramenters";
        return False;
    }
    elseif (count($arguments) % 2 != 0){
        print "Incorrect number of parameters given to the insertValue function";
        return False;
    }
    elseif (count($arguments) == 4){
        $sql_insert = "INSERT INTO $arguments[1]($arguments[2]) VALUES ('$arguments[3]')";
    }
    else{
        $columns = "(".$arguments[2];
        $values = "VALUES ('".$arguments[3]."'";
        for ($i=4; $i < count($arguments); $i++){
            $columns .= ", ".$arguments[$i];
            $values .= ", '".$arguments[++$i]."'";
        }
        $columns .= ") ";
        $values.= ");";
        $sql_insert = "INSERT INTO $arguments[1]".$columns.$values; 
    }
    echo $sql_insert."<br>";
    try{
        $insert_matricula = $arguments[0]->prepare($sql_insert);
        $insert_matricula->execute();
    }
    catch (Exception $e){
        print "Error matricula!: " . $e->getMessage() . "<br/>";
        die();
    }
}

insertValue($pdoConnection, "profesores", 'nombre', $nombre_profesor, 'apellido1', $apellido_profesor);
$profesor_id = checkValueExistance($pdoConnection,"id_profesor", "profesores", 'nombre', $nombre_profesor, 'apellido1', $apellido_profesor );

$sql_update = "UPDATE asignatura set id_profesor = '$profesor_id[0]' where nombre = '$classe';";


echo $sql_update;


$pdoConnection = null;


?>