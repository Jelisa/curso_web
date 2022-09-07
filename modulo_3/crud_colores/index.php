<?php
//llama y ejecuta el fichero conexion.php
include_once("conexion.php");

//capturar los datos del sql
$sql_select = "select * from colores";
try{
    $sql_data = $pdoConnection->prepare($sql_select);
    $sql_data->execute();
    $resultado = $sql_data->fetchAll();
}
catch (Exception $e){
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
// var_dump($resultado);

if ($_POST) {

    $color = $_POST['color'];
    $background = $_POST['background'];

    $sql_insert = "insert into colores (color, background) values (?,?)";
    try{
        $agregar_bd = $pdoConnection->prepare($sql_insert);
        $agregar_bd->execute(array($color, $background));
    }
    catch (Exception $e){
        print "Error!: " . $e->getMessage() . "<br/>";
        die();
    }

    $pdoConnection = null;
    header("location: index.php");
}

if ($_GET){
    $id = $_GET['id'];
    $sql_consulta_color = "select * from colores where id=?";
    try{
        $consulta_color = $pdoConnection->prepare($sql_consulta_color);
        $consulta_color->execute(array($id));

        $resultado_consulta_color = $consulta_color->fetch();
    }
    catch (Exception $e){
        print "Error!: " . $e->getMessage() . "<br/>";
        die();
    }
    // var_dump($resultado_consulta_color);
}


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
            <?php foreach ($resultado as $fila) : ?>
                <div class="filas" style="color:<?= $fila['color']; ?>; background-color:<?= $fila['background']; ?>;">
                    <!-- <button>E</button>
                    <button>B</button> -->
                    <p>
                        <!-- <a href="index.php?id=<?= $fila['id']; ?>">E</a> -->
                        <a href="index.php?id=<?= $fila['id']; ?>"><img src="images/edit-button.svg" alt="Boton de edicion" class="boton_edicion"></a>    
                        <a href="eliminar.php?id=<?= $fila['id']; ?>"><img src="images/delete-311.svg" alt="Boton de edicion" class="boton_edicion"></a>    
                        Color: <?= $fila['color']; ?> - Fondo: <?= $fila['background']; ?>
                    </p>
                </div>
            <?php endforeach ?>
        </div>
        <div id="right">
            <?php if(!$_GET):?>
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
            <?php endif ?>
            <?php if($_GET):?>
                <form action="editar_db.php" method="GET">
                    <fieldset>
                        <legend>Editar Fila</legend>
                        <label for="color">Text Color</label>
                        <input type="text" id="color" name="color" value="<?= $resultado_consulta_color['color']; ?>">
                        <br><br>
                        <label for="background">Background color</label>
                        <input type="text" id="background" name="background" value="<?= $resultado_consulta_color['background']; ?>">
                        <br><br>
                        <input type="hidden" name="id" id="id" value="<?= $resultado_consulta_color['id']; ?>">
                        <button class="boton">Editar fila</button>
                    </fieldset>
                </form>
                <?php endif ?>
        </div>
    </div>
</body>

</html>