<?php
if ($_POST){
    // Create the sql conection
    include_once("conexion.php");
    $user_name_given = $_POST["name"];
    $user_email_given = $_POST["email"];
    // Set the SQL query
    $sql_query = "select * from users where user_name = '$user_name_given' and user_email = '$user_email_given'";
    $user_query = $pdoConnection->prepare($sql_query); // Generate the query to be executed
    $user_query->execute(); // Execute the query

    $confirmation = $user_query->fetch(); // As it should return a single line we retrieve it.

    // var_dump($confirmation);

    $pdoConnection = null; // Close the sql connection.
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recordar contraseña</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <h1>Recordar Contraseña</h1>
    <div class="container">
        <!-- If the form hasn't been sent show it and ask for the user and the email-->
        <?php if (!$_POST or (array_key_exists("name",$_POST) & !$confirmation["user_name"])):?> 
            <form action="" method="post">
                <fieldset>
                    <legend>Formulario de recordatorio</legend>
                    <?php if(array_key_exists("name",$_POST) & !$confirmation["user_name"]):?>
                        <p class="warning">Nombre o correo incorrecto(s).</p>
                    <?php endif?>
                    <p>
                        <label for="name">Nombre</label>
                        <input type="text" name="name" id="name">
                    </p>
                    <p>
                        <label for="email">Correo electrónico</label>
                        <input type="email" name="email" id="email">
                    </p>
                    <button type="submit">Enviar Datos</button>
                </fieldset>
            </form> 
        <?php endif?>
        <?php if ($confirmation["user_name"]):?>
            <h2>Aquí tienes tu contraseña: <?php echo $confirmation["user_name"]?></h2>
            <h3><?php echo $confirmation["user_pass"]?></h3>
            <div class="boton"><a class="boton" href="../index.php">Vuelta al login</a></div>
        <?php endif?>
    </div>
</body>
</html>