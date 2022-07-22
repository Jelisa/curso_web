let dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
let days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const userDay = prompt("¿Qué día da la semana es?");
alert(translationUsingIndexOF(userDay));
// document.getElementById("respuesta").innerHTML = output;
alert(translationUsingForLoop(userDay));

function translationUsingIndexOF(input) {
    /* Parámetros: input una string introducida por el usuario
        Una función para traducir usando el método indexOf de las arrays
    */
    let index = dias.indexOf(input.toLowerCase());
    let output = "";
    if (index == -1) output = "El día introducido no es válido";
    else output = `The day of the week is ${days[index]}`;
    return output
}

function translationUsingForLoop(input){
    let output = "";
    for (let i = 0; i < days.length; i++) {
        if (dias[i] == input) {
            output("Today is:" + days[i])
            break;
        }
    }
    return output;
}
