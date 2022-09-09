// Recordatorio de funciones
// function primera (){
//     console.log("Soy la primera");
// }

// function segunda (){
//     console.log("Soy la segunda");
// }

// let cuarta = function (){
//     console.log("soy la cuarta")};

// cuarta();

// let tercera = () => console.log("soy la tercera");

// tercera();

let a = 1;
let b = 2;

function suma (a,b){
    let sum = a+b;
    return sum;
}

function salida(x){
    console.log(x);
}

let total = suma(a,b);

salida(total);

salida(suma(a,b));

function suma2 (x, y, callback2){
    callback2(x+y);
}

suma2(5,1,salida);

function suma3 (callback3, x, y){
    callback3(x+y);
}

suma3(salida,5,1)

let frase = "buEnAs tArdeS";

// Queremos que acabe siendo Buenas tardes

function fraseMinus(texto){
    return texto.toLowerCase();
}

function primeraMayus(texto){
    return texto.charAt(0).toUpperCase()+texto.slice(1);
}

function fraseCapital(texto, callbackSalida){
    callbackSalida(texto.charAt(0).toUpperCase()+texto.slice(1));
}
function fraseCorrecta (texto, callbackCapital){
    let textoMinusculas = texto.toLowerCase();
    callbackCapital(textoMinusculas, salida);
}

fraseCapital(frase, salida);

// console.log(primeraMayus(fraseMinus(frase)));