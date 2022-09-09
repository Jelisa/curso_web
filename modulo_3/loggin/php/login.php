<?php

    // The form can be submitted using  either the register or the login buttons.
    // Depending on which one was used we should either login or register a new user.
    if (array_key_exists('register',$_POST)){
        // If the form has been submitted using the register button redirect to the
        // registration form
        header("location:registration_form.php");
    }
    else if (array_key_exists("login", $_POST)){
        // If the form was submitted using the login button we proceed to check for the user.
        include_once("conexion.php");
        $user_name_given = $_POST["user"];
        $user_pass_given = $_POST["password"];

        if (!$user_name_given or !$user_pass_given){
            header("location: ../index.php?0");
            die();
        }
        
        $sql_query = "select count(*) as results from users where user_name = '$user_name_given' and user_pass = '$user_pass_given'";
        $user_query = $pdoConnection->prepare($sql_query);
        $user_query->execute();

        $confirmation = $user_query->fetch();

        $pdoConnection = null;
        echo "try ".$confirmation['results']."<br>";
        
        switch ($confirmation["results"]){
            case 0:
                echo "0<br>";
                header("location: ../index.php?1");
                break;
            case 1:
                echo "1<br>";
                header("location:welcome.php?user=$user_name_given");
                break;
            default:
                echo "Database Error";
        }

    }

?>