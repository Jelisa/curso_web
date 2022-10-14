$(document).ready(function () {
    $('#example').DataTable();
});

console.log("HOLA!!!!");

function eliminarInscrito(idToRemove){
    console.log('hola');
    let deleteStudent = confirm("¿Esta seguro de que quiere eliminar el alumno?");
    if (deleteStudent){
        fetch("./pdo_delete_alumno.php", {method: "POST", body:idToRemove})
            .then(response => response.text())
                .then(response => {console.log(response)});
    }
}