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
        
        $sql_query = "select count(*) as results from users where user_name = '$user_name_given' and user_pass = '$user_pass_given'";
        // print( $sql_query);    
        $user_query = $pdoConnection->prepare($sql_query);
        // echo "<br>3";
        $user_query->execute();
        // echo "<br>4";

        $confirmation = $user_query->fetch();

        // echo "<br>i";

        // var_dump($confirmation);
        
        $pdoConnection = null;
        echo "try ".$confirmation['results']."<br>";
        
        switch ($confirmation["results"]){
            case 0:
                echo "0<br>";
                header("location: ../index.php?incorrect_credentials=");
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