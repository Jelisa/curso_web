<?php
// echo $_GET['id'];

include("conexion.php");

$id = $_GET['id'];
try{
    $sql_delete = "delete from colores where id=?";
    $delete_row = $pdoConnection->prepare($sql_delete);
    $delete_row->execute(array($id));
}
catch (Exception $e){
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
$delete_row = null;
$pdoConnection = null;

header("location: index.php");
?>