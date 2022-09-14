//Función para actualizar los relojes con independencia del método usado.
function updateReloj(selectorId, useSeparator = false) {
    /** Función para mostrar por pantalla la fecha actual
     * Recibe dos parámetros:
        ** selectorId: un string que contiene el identificador del elemento HTML que ha de mostrar la hora actual
        ** useSeparator: se usa a modo de booleano con false como valor por defecto para definir el formato del reloj a mostrar.
            *** Este parámetro podría ser convertido en un string que especifique el formato en caso de querer soportar más de 
                dos formatos. *** 
     */
    let fecha = new Date();
    if (useSeparator) {
        document.querySelector(selectorId).innerHTML = `${fecha.getHours()}H:${fecha.getMinutes()}M:${fecha.getSeconds()}S`
    }
    else {
        // console.log("estoy en el update reloj falso");
        document.querySelector(selectorId).innerHTML = fecha.toLocaleTimeString();
    }
}

// Add functionality to Reloj1
/* Uso dos funciones independientes para inicializar el reloj y para pararlo */
let intervalo_reloj1 // Esta variable se ha de definir fuera de las funciones para que el programa se ejecute correctamente.
function startReloj1() {
    intervalo_reloj1 = setInterval(updateReloj, 1000, "#reloj1");
}
function stopReloj1() {
    clearInterval(intervalo_reloj1);
    updateReloj("#reloj1"); // Esta líneaa hace que el reloj se actualice  cada vez que se aprieta el botón.
}

// Add functionality to Reloj2
/* Uso una función que se llama desde el html con un parámetro para indicar si se ha de iniciar
    o parar el reloj.
*/
let intervalo_reloj2;
function functionReloj2(estado) {
    console.log(3, estado);
    if (estado == "start") {
        intervalo_reloj2 = setInterval(updateReloj, 1000, "#reloj2", true) // paso un argumento extra true para que formatee la string.
    }
    else if (estado == "stop") {
        clearInterval(intervalo_reloj2);
        // en este caso no hago un update del reloj al pararlo de forma que se muestra la hora 
        // mostrada en el momento de apretar el stop. Este botón no actualiza el reloj al
        // contrario que el resto de botones de stop de la página.
    }
}

// Add functionality to Reloj3 //
/* Este reloj tiene un 3er boton que permite programar una alarma.
    En este caso usamos el método addEventListener de JavaScript para añadir la funcionalidad a los botones.
*/

//seleccionamos los botones
const botonInicio3 = document.querySelector("#inicioReloj3");
const botonDeterner3 = document.querySelector("#stopReloj3");
const botonProgramar = document.querySelector("#programarReloj3");

// creacion de las variables que han de guardar los setInterval
let interval_counter;
let alarm_interval;
// console.log(alarm_interval); // Un chivato usado en la debuggación y búsqueda de errores.

//Añadimos un evento a cada boton que inicializa los setInterval que han de actualizar los relojes.
botonInicio3.addEventListener("click", () => {
                                        interval_counter = setInterval(updateReloj, 1000, "#reloj3")
                                    });

botonDeterner3.addEventListener("click", () => { console.log(2, interval_counter)
                                                clearInterval(interval_counter),
                                                updateReloj("#reloj3")});

botonProgramar.addEventListener("click", () => { if (alarm_interval !== undefined){
                                                    //evita la puesta en marcha de múltiples setInterval al
                                                    // clickar múltiples veces en el boton de programar
                                                    clearInterval(alarm_interval);
                                                }
                                                // Resetea el mensaje de la alarma al programar una nueva.
                                                document.getElementById(id).innerHTML = "";
                                                resetAlarmMessageFormat("alarm");
                                                alarm_interval = setInterval(esLaHora, 1000)});

function esLaHora() {
    /** Función para comprobar si la hora actual es la misma que la hora introducido en el formulario de alarma.
     * No recibe parámetros ya que obtiene la informacion necesaria del formulario y de un objeto Date.
     * Si la hora actual coincide con la del formulario se imprime el mensaje de alarma y se para el intervalo.   
     */
    let fecha = new Date();
    // console.log('alarm running'); // chivato que sirve para debuggear el código.
    if (fecha.getHours() == document.querySelector("#hora").value &&
        fecha.getMinutes() == document.getElementById("minutos").value &&
        fecha.getSeconds() == document.getElementById("segundos").value){
            document.getElementById(id).innerHTML = "Es la hora!!";
            setAlarmMessageFormat("alarm")
            clearInterval(alarm_interval);
    }
}

// Las dos siguientes  funciones sirven para separar el formateo del mensaje de la alarma
//  de la funcionalidad de los botones 
function resetAlarmMessageFormat(id){
    /** Una función para eliminar el formato dado al elemento cuyo id se proporciona.
     *Parámetros:
        ** id: un string que debe contener el id del elemento a formatear.
     */
    let alarm_message = document.getElementById(id);
    alarm_message.style.backgroundColor = "white";
    alarm_message.style.padding = "0em";
    alarm_message.style.fontSize = "1em";
}

function setAlarmMessageFormat(id) {
    /** Una función para dar formato de "alarma" al elemento cuyo id es pasado por parámetro..
     *Parámetros:
        ** id: un string que debe contener el id del elemento a formatear.
    */
    let alarm_message = document.getElementById(id);
    alarm_message.style.backgroundColor = "#ffda83";
    alarm_message.style.padding = ".25em";
    alarm_message.style.fontSize = "1.5em;";
}



/* Apuntes y notas.

// botonInicio3.onclick = () => console.log("has hecho click"); //al hacer click cualquier otro evento no funciona

Las variables que han de guardar los objetos de setInterval se han de declarar antes de la funcion  que crea el objeto
y fuera de la función para evitar la redifinicion accidental al llamar la función.

Al hacer que el botón de parado actualice la hora al ser apretado este cambia la hora cada vez que se aprieta.

* Detectado un comportamiento errático: a veces la función del reloj no se para correctamente una vez
    programada la alarma.

*/