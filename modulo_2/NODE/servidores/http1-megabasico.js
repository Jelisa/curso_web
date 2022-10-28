// Carga del módulo http
const http = require('http');

console.log(http.STATUS_CODES)

// creamos el servidor
http.createServer((request, response)=>{
    // última instruccion para el serviidor
    response.end('hola')
}).listen(3000) // puerto de conexión
