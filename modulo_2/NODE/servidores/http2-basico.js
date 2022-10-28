// Carga del módulo http
const http = require('http');

const PUERTO = 4000

const SERVER = http.createServer((req, res)=>{
    
    // console.log(`url: ${req.url}`);
    // console.log(`method: ${req.method}`)
    // console.log(`headers: `,req.headers);

    console.log('status:', res.statusCode)
    res.statusCode = 404;

    // última instruccion para el serviidor
    res.end('hola')
})
SERVER.listen(PUERTO, ()=>{ 
    console.log(`escuchando en http://localhost:${PUERTO}`);}) // puerto de conexión
