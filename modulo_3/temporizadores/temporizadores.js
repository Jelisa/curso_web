/* Demora la ejecución de una función que se pasa
    como parámetro una cantidad de tiempo determinada */

// setTimeout(
//     () => console.log("Me he demorado"),
//     2000
// );
// console.log("Voy a tiempo");


// let contador = 0;
// let intervalo = setInterval(
//                         () => console.log("soy el intervalo",contador++),
//                         1000
//                         );

// setTimeout(()=>{clearInterval(intervalo)},
//     18000    
// );


let fecha = new Date;
console.log(fecha.getUTCHours())

let segundos = fecha.getSeconds();

function updateValue(valor, id){
    console.log('hola');
    console.log (valor++);
}

let intervalo_segundos = setInterval(updateValue, 1000, segundos, "#segundos1" );