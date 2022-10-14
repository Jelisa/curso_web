<?php
function createSelectQuery (...$arguments){
    // var_dump($arguments);
    if (count($arguments) < 3){
        print "The function createSelectQuery is missing paramenters";
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
    return $sql_select;
}

function createInsertQuery (...$arguments){

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
    return $sql_insert;
}

function checkValueExistance(...$arguments){
    /** The function should receive at least 3 parameters, the first ons being a PDO connection.
     * 
     */

    $sql_select  = createSelectQuery(...$arguments);
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

    $sql_insert = createInsertQuery(...$arguments);
    echo $sql_insert."<br>";
    executeSQLInstruction($sql_insert, $arguments[0]);

}

function executeSQLInstruction ($sql_instruction, $connection){
    try{
        $sql_order = $connection->prepare($sql_instruction);
        $sql_order->execute();
    }
    catch (Exception $e){
        print "Error $sql_instruction  !: " . $e->getMessage() . "<br/>";
        die();
    }
}

?>