
function pedirApellido() {
    let apellido = prompt("Introduzca el apellido, por favor.");
    return apellido;
}

function pedirNombre() {
    let nombre = prompt("Introduzca el nombre, por favor.");
    return nombre
}

class persona{
    constructor(){
        this.nombre = "";
        this.apellido = "";
    }
    get fullName(){
        return this.generateFullname();
    }
    generateFullname(){
        return this.apellido.concat(", ", this.nombre)
    }
}

function cuantosMiembrosHay() {
    let n = parseInt(prompt("Cuantos miembros quiere introducir?"));
    if (isNaN(n)){
         n = 0;
         alert("No has introducido un número válido de miembros");
    }
    return n
}
function introducirMiembros() {
    let n = cuantosMiembrosHay();
    let listado_miembros = [];
    for (let i = 0; i < n; i++) {
        let member = new persona();
        member.nombre = pedirNombre();
        member.apellido = pedirApellido();
        listado_miembros.push(member);
    }
    return listado_miembros;
}



function escribirOutput(listaAMostrar) {
    let output = ""
    if (listaAMostrar.length == 0) {
        output = "No se ha introducido ningún miembro";
    }
    else {
        output = listaAMostrar[0].fullName;
        for (let i = 1; i < listaAMostrar.length; ++i) {
            output += "<br>" + listaAMostrar[i].fullName;
        }
    }
    return output
}

document.getElementById("respuesta").innerHTML = escribirOutput(introducirMiembros());