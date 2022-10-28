// Load the required modules
const {createServer} = require('http');
const {createReadStream} = require('fs');
const path = require('path');
const process = require('process')

// Connection Port
const {PUERTO = 4000} = process.env;

// Content type(s) to send
const HTML_CONTENT_TYPE = 'text/html';
const CSS_CONTENT_TYPE = 'text/css';
const JS_CONTENT_TYPE = 'text/javascript';

// console.log(__dirname)

// Generate the path to the files where the files are
const DIR_HTML = path.join(__dirname, 'src');
console.log(DIR_HTML);

const SERVER = createServer((req, res)=>{
    // obtain the path
    const {url} = req;
    // code for everything foes OK
    let statusCode = 200;
    // We start loading the HTML
    let contentType = HTML_CONTENT_TYPE;
    // VAriable to manage the streams.
    let stream ;

    if(url === '/'){
        console.log(url)
        // Create the stream to read the HTML file
        stream = createReadStream(`${DIR_HTML}/index.html`, )
    }else if(url.match('\.css')){
        contentType = CSS_CONTENT_TYPE
        // Create the stream to read the CSS file
        stream = createReadStream(`${DIR_HTML}/style.css`, )
    }else if(url.match('\.js')){
        console.log(url)
        contentType = JS_CONTENT_TYPE
        // Create the stream to read the JS file
        stream = createReadStream(`${DIR_HTML}/index.js`, )
    }
    else {
        console.log(url)
        statusCode = 404
    }

    res.writeHead(statusCode, {'Content-Type' : contentType})

    // Send the stream as answer
    if (stream){
        stream.pipe(res);
    } else{
        return res.end("Resource not found.")
    }

})

// Listen on the connection port, the callback returns a message if it's capable of listening
SERVER.listen(PUERTO, ()=>{ 
    console.log(`The server is listening at http://localhost:${PUERTO}`);
}); // puerto de conexión
