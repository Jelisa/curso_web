/* Vamos a preguntar al usuario que día de la semana es.
Responderá en castellano: "Lunes", por ejemplo.
Con esa información mostraremos un console.log
con el mensaje con el día que corresponda: "Today is Monday", en ese caso */

const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const pregunta = prompt("¿Qué día es?");


for (let i = 0; i<days.length; i++) {
    if (dias[i]==pregunta){
        console.log("Today is " + days[i])
        break;
    } 
}