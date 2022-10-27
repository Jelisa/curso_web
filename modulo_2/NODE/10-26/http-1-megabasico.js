// Cargamos el módulo http
const http = require('http')

//console.log(http.STATUS_CODES);

// Creamos el servidor con createServer
http.createServer((request, response) => {
    // Última instrucción para el servidor
    console.log(request.url);
    response.end('Hola')
}).listen(4000) // puerto de conexión