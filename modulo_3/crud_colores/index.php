<?php
//llama y ejecuta el fichero conexion.php
include_once("conexion.php");

//capturar los datos del sql
$sql_select = "select * from colores";

$sql_data = $pdoConnection -> prepare($sql_select);
$sql_data->execute();

$resultado = $sql_data->fetchAll();

// var_dump($resultado);


?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crud php</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1>Soy PHP</h1>
    <div class="container">
        <div id="left">
            <?php foreach($resultado as $fila): ?>
                <div class="filas" style="color:<?=$fila['color'];?>; background-color:<?=$fila['background'];?>;">
                    <p>Color: <?=$fila['color'];?> - Fondo: <?=$fila['background'];?></p>
                </div>
            <?php endforeach?>
        </div>
        <div id="right">
            <form action="" method="POST">
                <fieldset>
                    <legend>Agregar Fila</legend>
                    <label for="color">Text Color</label>
                    <input type="text" id="color" name="color">
                    <br><br>
                    <label for="background">Background color</label>
                    <input type="text" id="background" name="background">
                    <br><br>
                    <button class="boton">Agregar fila</button>
                </fieldset>
            </form>
        </div>
    </div>
</body>
</html>