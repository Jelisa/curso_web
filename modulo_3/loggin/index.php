<?php
include_once("php/conexion.php");
//variables to keep track of what's happening
$initial_loggin = True;
$remember_password = False;
$new_user = False;
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loggin</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1>Loggin</h1>
    <div class="container">
        <?php if ($initial_loggin):?>
            <form action="" method="post">
                <fieldset>
                    <legend>Loggin</legend>
                    <p>
                        <label for="user">Usuario</label>
                        <input type="text" id="user" name="user">
                    </p>
                    <p>
                        <label for="password">Contraseña</label>
                        <input type="text" id="user" name="password">
                    </p>
                    <p><a href="#">Recordar Contraseña</a></p>
                    <button type="submit">Conectarse</button>
                    <button type="submit">Darse de alta</button>
                </fieldset>
            </form>
        <?php endif;?>
    </div>
</body>
<footer>
    Jelisa Iglesias
</footer>
</html>