<?php

    include("conexion.php");

    $id = $_GET['id'];
    $color= $_GET['color'];
    $background  = $_GET['background'];
    $sql_update = "update colores set color=?, background=? where id=?";
    try{
        $editar_db = $pdoConnection->prepare($sql_update);
        $editar_db->execute(array($color,$background,$id));
    }
    catch (Exception $e){
        print "Error!: " . $e->getMessage() . "<br/>";
        die();
    }
    $editar_db = null;
    $pdoConnection = null;

    header("location: index.php");
?>