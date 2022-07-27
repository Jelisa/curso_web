let nombre1 = "maria", nombre2 = "de la O";

console.log(saludar(nombre1, nombre2));

// Funcion standard simple.
function saludar(nom1, nom2) {
    return "Hola " + nom1 + nom2;
}
var flecha2 = (nom1, nom2) => {return "Hola " + nom1 + nom2};
var flecha2 = (nom1, nom2) => "Hola " + nom1 + nom2;
console.log("flecha2 ", flecha2(nombre1,nombre2))


let nuevoSaludar = function (nom1, nom2) {
    return "Hola " + nom1 + nom2;
}

console.log('nuevo saludar', nuevoSaludar(nombre1, nombre2));

let saludar3 = function (nom1, nom2) {
    return "Hola " + nom1 + nom2;
}(nombre1, nombre2);

console.log('saludar3', saludar3);

// let suma = function(num1, num2){
//     return num1 + num2;
// }

// console.log('suma', suma(3,5))

(function () { console.log("soy una función automatica") })();

function duplicar(a) {
    return a * 2;
}

var flecha1 = (a) => { return a * 2 }
var flecha1 = a => a*2;

console.log(flecha1(5))

var areaCirculo = r =>{
    const pi = 3.1415;
    return r*2*pi;
};

console.log("f", areaCirculo(3))

var areaCirculo2 = r =>{
    const pi = 3.1415;
    return r*2*pi;
};

console.log("f2", areaCirculo2)

let hoyEsMiercoles = dia => {if (dia=="mierc") return true; else return false;}
console.log(hoyEsMiercoles("mar"));

let a = 2;
let b= 5;
let booleano = (a > b) ? console.log("es verdadero") : console.log("es falso")