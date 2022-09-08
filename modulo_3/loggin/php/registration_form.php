<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro nuevo  usuario</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <h1>Registro de Usuario</h1>
    <div  class="container">
        <form action="create_user.php" method="post">
            <fieldset>
                <legend>Formulario de alta</legend>
                <p>
                    <label for="name">Nombre </label>
                    <input type="text" name="name" id="name">
                </p>
                <p>
                    <label for="surname">Apellido </label>
                    <input type="text" name="surname" id="surname"> 
                </p>
                <P>
                    <label for="password">Contraseña</label>
                    <input type="text" name="password" id="password"> 
                </P>
                <P>
                    <label for="email">E-mail</label>
                    <input type="email" name="email" id="email"> 
                </P>
                <button type="submit" name="new_user">Crear Cuenta</button>
            </fieldset>
        </form>
    </div>
</body>
</html>