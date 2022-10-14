<!DOCTYPE html>
<?php include "./php/pdo_select_alumnos_interfaz.php";
include ".php/pdo_functions";?>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forms with PHP</title>
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.2.0/css/bootstrap.min.css"> -->
    <!-- Datatable link -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <div class="container-fluid">
        </div>
    </header>
    <main>
    <div class="container">
        <h1 class="text-center">Curso de desarrollo web</h1>
        <hr>
        <div class="row">
            <div class="col col-sm-4">
                <h2 class="text-center">Formulario Inscripción</h2>
                <form action="">
                    <div class="mb-3">
                        <label for="nif" class="form-label">NIF</label>
                        <input type="text" class="form-control" id="nif" name="nif" placeholder="nif">
                    </div>
                    <div class="mb-3">
                        <label for="nombre" class="form-label">nombre</label>
                        <input type="text" class="form-control" id="nombre" name="nombre" placeholder="nombre">
                    </div>
                    <div class="mb-3">
                        <label for="apellido" class="form-label">apellido</label>
                        <input type="text" class="form-control" id="apellido" name="apellido" placeholder="apellido">
                    </div>
                    <div class="mb-3">
                        <label for="ciudad" class="form-label">ciudad</label>
                        <input type="text" class="form-control" id="ciudad" name="ciudad" placeholder="ciudad">
                    </div>
                    <div class="mb-3">
                        <label for="cumple" class="form-label">Fecha de Nacimiento</label>
                        <input type="text" class="form-control" id="cumple" name="cumple" placeholder="cumple">
                    </div>
                    <div class="mb-3">
                        <label for="genero" class="form-label">Genero</label>
                        <input type="text" class="form-control" id="genero" name="genero" placeholder="genero">
                    </div>
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary">Inscribir</button>
                    </div>
                </form>
            </div>
            <div class="col col-sm-8">
                <h2 class="text-center">Alumnos Inscritos</h2>
                <table id="example" class="table table-hover table-responsive table-striped" style="width:100%">
                    <thead class="bg-dark text-light">
                        <tr>
                            <th>Nif</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Ciudad</th>
                            <th>Fecha de nacimiento</th>
                            <th>Género</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php echo $output;?>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Nif</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Ciudad</th>
                            <th>Fecha de nacimiento</th>
                            <th>Género</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
    </main>
    <footer></footer>
    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    <!-- Datatable imports -->
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap5.min.js"></script>
    <!-- Our script -->
    <script src="js/app.js"></script>
</body>
</html>