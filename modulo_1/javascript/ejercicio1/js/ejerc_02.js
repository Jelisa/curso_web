
function cuantosMiembrosHay() {
    let n = parseInt(prompt("Cuantos miembros quiere introducir?"));
    if (isNaN(n)) {
        n = 0;
        alert("No has introducido un número válido de miembros");
    }
    return n
}

function pedirApellido() {
    let apellido = prompt("Introduzca el apellido, por favor.");
    return apellido;
}

function pedirNombre() {
    let nombre = prompt("Introduzca el nombre, por favor.");
    return nombre
}

function introducirMiembros() {
    let n = cuantosMiembrosHay();
    let listado_nombre_miembros = [];
    let listado_apellido_miembros = [];
    for (let i = 0; i < n; i++) {
        listado_nombre_miembros.push(pedirNombre());
        listado_apellido_miembros.push(pedirApellido());
    }
    return [n, listado_nombre_miembros, listado_apellido_miembros];
}

function escribirOutput(informacion) {
    let output = "";
    let n = informacion[0];
    let nombres= informacion[1];
    let apellidos = informacion[2]
    if (n == 0) {
        output = "No se ha introducido ningún miembro";
    }
    else {
        output = `${apellidos[0]} , ${nombres[0]}`;
        for (let i = 1; i < n; ++i) {
            output = output +  `<br> ${apellidos[i] , nombres[i]}`;
        }
    }
    return output
}

document.getElementById("respuesta").innerHTML = escribirOutput(introducirMiembros());