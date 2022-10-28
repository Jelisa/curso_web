// Carga del módulo http
const http = require('http');

// Connection Port
const PUERTO = 4000

const SERVER = http.createServer((req, res)=>{

    // res.setHeader('')
    
    if (req.url == '/'){
        res.write("<h1>Estoy en la página principal</h1>")
    }
    else if(req.url == '/productos'){
        res.write("<h1>Estoy en la página productos</h1>")
    }
    else{
        res.write("<h1>No encontrado</h1>")
    }
    res.write(`<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Basic server</title>
    </head>
    <body>
        
    </body>
    </html>`)

    // última instruccion para el serviidor
    res.end()
})

// Listen on the connection port, the callback returns a message if it's capable of listening
SERVER.listen(PUERTO, ()=>{ 
    console.log(`escuchando en http://localhost:${PUERTO}`);}) // puerto de conexión
