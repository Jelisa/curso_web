const fs = require ('fs')

// fs.readFile('moby10b.txt', 'utf-8', (err, libro) => {
//     if(err) throw err
//     console.log(libro)
// })

let flujo = fs.createReadStream('moby10b.txt', 'utf-8');
let data = '';
flujo.once('data', () => {
    console.log("Empezando el flujo...")
})
flujo.on('data', (chunks) => {
    // console.log("Procesando...");
    data += chunks;
});
flujo.on('end', () => {
    console.log("Flujo completado");
    console.log(data.length);
})

