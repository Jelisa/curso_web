<?php
include_once("conexion.php");
 
var_dump($_POST);

$user_name = $_POST['name'];
$user_surname = $_POST['surname'];
$user_pass = $_POST['password'];
$user_email = $_POST['email'];

$sql_insert = "insert into users (user_name, user_surname, user_pass, user_email) values (?,?,?,?)";
try{
    $add_user = $pdoConnection->prepare($sql_insert);
    $add_user->execute(array($user_name, $user_surname, $user_pass, $user_email));
}
catch (Exception $e){
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}

$pdoConnection = null;

header("location:../index.php")

?>