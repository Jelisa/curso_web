import { autores } from "./datos.js";

import {dividir} from "./funciones.js"

// console.log(autores)
// console.log(autores.autor1.nombre.pseudonimo);

// console.log(dividir(5,2))
// console.log(dividir(3,0))
// console.log(dividir('ok', 3))

// try {
//     console.log(1/0)
//     throw "Mi error"
// } catch (error) {
//     console.log(3, error)
// }

// for (let i = 0; i < 1000000; i++){
//     console.log(i)
// }

// Encadenar callbacks es el MAL así que se han diseñado las PROMESAS
// function myAuthor (autores, callback1, callback2) {
//     console.log(callback1(autores), callback2);
// }

// function callback1 (autores, callback2){
//     return callback2(autores.autor1)
// }

// function callback2 (autor){
//     return autor.nombre
// }

// myAuthor(autores, callback1, callback2)

const misDatos = (misAutores) => {
    return new Promise((resolve, reject) => {
        let opcion = true
        if (opcion){
            setTimeout(()=>{
                return resolve(misAutores)
            }, 3000)}
        else{
            return reject("no he encontrado los autores")
        }
    })
}
console.log("Contando nubes")

misDatos(autores)
    .then(() => {return autores.autor2})
        .then( (autor) => console.log(autor.nombre.pseudonimo))
    .catch(error => {console.log(error)})

console.log("Contando patitos")

const editoriales = {
    "1": "Minotauro",
    "2": "Bruguera",
    "3": "Alianza Editorial",
    "4": "Edhasa",

}