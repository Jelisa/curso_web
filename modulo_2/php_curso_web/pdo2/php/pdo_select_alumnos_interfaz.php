<?php

// import the file and check it only the first time used.
require_once "pdo_connection.php";

// Write the sql sentence
$sql_select = "SELECT * FROM alumnos;";

try{
    $consulta_alumnos = $pdoConnection->prepare($sql_select);
    $consulta_alumnos->execute();

    $resultado_consulta_alumnos = $consulta_alumnos->fetchAll(PDO::FETCH_ASSOC);
    $output = "";
    foreach($resultado_consulta_alumnos as $alumno){
        $output .= "<tr><td>".$alumno["nif"]."</td>
                    <td>".$alumno["nombre"]."</td>
                    <td>".$alumno["apellido"]."</td>
                    <td>".$alumno["ciudad"]."</td>
                    <td>".$alumno["fecha_nacimiento"]."</td>
                    <td>".$alumno["sexo"]."</td>";
        $output .= "<td> <button class='btn btn-warning'>Editar</button></td>";
        $output .= "<td> <button class='btn btn-danger' onclick='eliminarInscrito(".$alumno['id_alumno'].")'>Eliminar</button></td>";
        $output .= "</tr>";
    }
    // print $output;
}
catch (Exception $e){
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}


$pdoConnection = null;
// $resultado_consulta_alumnos = null;
?>