// Ejercicios arrays

// Crea un array para albergar al menos 10 números enteros aleatorios entre 1 y 20, luego rellena el array con ellos. 
const minValue = 1, maxValue=20, arraylength = 10;
let randomNumbers = [];//.fill(Math.floor(Math.random() * (maxValue - minValue)) + minValue,0,10);
for (let i = 0; i<arraylength; i++) randomNumbers.push(Math.floor(Math.random() * (maxValue - minValue)) + minValue);
console.log("numeros aleatorios",randomNumbers);

// El ejercicio trata de crear a partir de este array otros dos uno con los números pares y otro con los impares. 
// No debes usar bucles, usa el método del array que creas más apropiado.
console.log("numeros impares", randomNumbers.filter(number => number % 2 == 0));
console.log("numeros pares",randomNumbers.filter(number => number % 2 != 0));

// Crea un array de al menos 10 elementos para guardar números enteros. Usa un método para obtener la suma de los números pares y la de los números impares.

console.log ("suma pares", randomNumbers.filter(number => number % 2 == 0).reduce((total,numero)=>total+=numero));
console.log ("suma impares", randomNumbers.filter(number => number % 2 == 1).reduce((total,numero)=>total+=numero));

// Tienes que crear un script que gestione una lista de la compra. Para ello tienes dos listas de artículos: compra, pendiente. Cada elemento de la lista compra es un objeto con dos propiedades: nombre del artículo y estado. Estado es un booleano true si el artículo se compró, false en caso contrario. Pendiente es una lista con los nombres de los artículos que faltan por comprar. La función que debes crear recibe como argumento la lista de compra y devuelve la lista de pendientes.
let compra = [{nombre:"lavavajillas", estado:true}, {nombre:"papel", estado:false}, {nombre:"kleenex", estado:false}]
function encuentraPendientes(listaCompra){
    let pendientes =[];
    listaCompra.forEach(item => {if (!item.estado) pendientes.push(item.nombre)});
    return pendientes
}
console.log(encuentraPendientes(compra));

// Tienes una lista de objetos con los nombres de los miembros de una familia. 
let familia = [
{nombre:'Juan', edad: 34}, 
{nombre:'Pepa', edad: 40}, 
{nombre:'Ana', edad: 12} ,
{nombre:'Luis', edad: 14} 
]

// Este script debe devolver dos objetos con el nombre y edad del miembro de mayor edad y del de menor edad.
let familiaOrdenadaPorEdadAscendente = familia.sort((a,b) => {
    if (a.edad<b.edad) return -1;
    if (a.edad>b.edad) return 1;
    return 0;
});
console.log(familiaOrdenadaPorEdadAscendente[0],
    familiaOrdenadaPorEdadAscendente[familiaOrdenadaPorEdadAscendente.length-1]);

