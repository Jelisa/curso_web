const fs = require('fs');
// console.log(fs.constants);

// fs.writeFile("miFichero.txt", 'texto de prueba2', (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log("1. fichero creado");
// });

// fs.appendFile("miFichero.txt", "\npato de goma", errorMessage)

// fs.rename('miFichero.txt', 'patitodegoma.txt', errorMessage)

// fs.readFile('patitodegoma.txt', 'utf-8', (err,content) =>{
//     if (err) {
//         throw err;
//     }
//     console.log(content);
// })

// fs.truncate('patitodegoma.txt', errorMessage)

// function errorMessage(err){
//     if (err) {
//         throw err;
//     }
//     console.log("fichero updateado");
// }

// writeFile, appendFile, rename, readfile son ASINCRONOS cuidado con mezclarlos pq pueden anularse segun lo que tarden en ejecutarse. Hay las versiones syncronas

fs.writeFileSync("miFichero.txt", 'texto de prueba2');
console.log("fichero creado")

fs.appendFileSync("miFichero.txt", "\npato de goma", )
console.log("fichero actualizado")

fs.renameSync('miFichero.txt', 'patitodegoma.txt', )
console.log("fichero renombrado")

let content = fs.readFileSync('patitodegoma.txt', 'utf-8')
console.log(content);

fs.truncateSync('patitodegoma.txt');

fs.mkdirSync('js');
console.log('directorio creado');


function errorMessage(err){
    if (err) {
        throw err;
    }
    console.log("fichero updateado");
}
