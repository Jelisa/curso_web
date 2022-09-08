<?php
    echo "Holi";
    var_dump($_POST);
    if (array_key_exists("login", $_POST)){
        include_once("php/login.php");

        

        $pdoConnection = null;
    }
    else if (array_key_exists('register',$_POST)){
        header("location:registration_form.php");
    }
?>