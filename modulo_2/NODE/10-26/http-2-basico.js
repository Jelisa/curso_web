// Cargamos el módulo http
const http = require('http')

const PUERTO = 4000;
// Creamos el servidor con createServer
const server = http.createServer((req, res) => {

    // console.log('url :', req.url);
    // console.log('method:', req.method)
    // console.log('headers:', req.headers)
console.log('statuscode',res.statusCode);
res.statusCode = 404;


    // Última instrucción para el servidor
    res.end('Hola')
});

// puerto de conexión
server.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`)
});

