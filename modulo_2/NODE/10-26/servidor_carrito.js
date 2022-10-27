// Módulos requeridos
const { createServer } = require('http');
const { createReadStream } = require('fs');
const path = require('path');

// Puerto de conexión
const { PUERTO = 3000 } = process.env;

// Tipo de fichero a enviar
const HTML_CONTENT_TYPE = 'text/html';
const CSS_CONTENT_TYPE = 'text/css';
const JS_CONTENT_TYPE = 'text/javascript';
const PNG_CONTENT_TYPE = 'image/png'; // <= Content-Type PNG


// Construir la ruta de los ficheros a
// devolver con la petición
const HTML_DIR = 'carrito';
const MAIN_DIR = path.join(__dirname, HTML_DIR)

const server = createServer((req, res) => {
    // Obtener la ruta
    const { url } = req;
    // Caso de respuesta correcta
    let statusCode = 200;
    // Empezamos por el fichero HTML
    let contentType = HTML_CONTENT_TYPE;
    // Preparamos el flujo para la lectura 
    // de los ficheros
    let stream;

    // Inicio desde la ruta raíz
    if (url === '/') {
        // Creamos el flujo para la lectura del fichero html
        stream = createReadStream(`${MAIN_DIR}/index.html`)
    } else if (url.match("\.css$")) {
        contentType = CSS_CONTENT_TYPE;
        console.log(`${MAIN_DIR}/${url}`);
        // Creamos el flujo para la lectura del fichero css
        stream = createReadStream(`${MAIN_DIR}/${url}`);
    } else if (url.match("\.js$")) {
        contentType = JS_CONTENT_TYPE;
        // Creamos el flujo para la lectura del fichero javascript
        stream = createReadStream(`${MAIN_DIR}/${url}`);
    } else if (url.match("\.png$")) {
        contentType = PNG_CONTENT_TYPE;
        // Creamos el flujo para la lectura del fichero javascript
        stream = createReadStream(`${MAIN_DIR}/${url}`);
    } else {
        // Si llega aquí es que no encuentra el recurso
        statusCode = 404
    }

    // Creamos la cabecera
    res.writeHead(statusCode, { 'Content-Type': contentType });

    // Enviamos el flujo como respuesta
    if (stream) {
        stream.pipe(res); // Si tiene un stream lo envía como respuesta
    } else { 
        return res.end("No he encontrado el recurso") // No tiene nada para enviar
    }

});

server.listen(PUERTO, () => {
    console.log(`Servidor escuchando por http://localhost:${PUERTO}`);
})

