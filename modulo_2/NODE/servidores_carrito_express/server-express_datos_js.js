// load the package into memory, it needs to be pre-installed via npm
const express = require('express');
const process = require('process')

// app its the accorded name for express.
const app = express();


// Assign the connection port
// sintaxis 1
// const {PUERTO = 3000} = process.env;
// sintaxis 2
const PUERTO = process.env.PORT || 3000;

// Import the clientelle data
const {clientes} = require('./data/alumnos.js');

// console.log(process.env);

app.get('/', function (req, res) {
    // // Send text to the site's root
    // res.send('Hello World');
    // send index.html file to the site's root
    // res.sendFile(`${__dirname}/static/index.html`)
    res.sendFile('./static/index.html', { root: __dirname })
})

app.get('/clientes', function (req, res) {
    // // Send text to the site's root
    // res.send('Hello World');
    // send index.html file to the site's root
    // res.sendFile(`${__dirname}/static/index.html`)
    res.sendFile('/static/clientes.html', { root: __dirname })
})

app.get('/api/clientes',(req, res) =>{
    res.send(JSON.stringify(clientes))
} );

app.get('/api/clientes/:Params',(req, res) =>{
    let nombreCliente, nombreCiudad, result;
    if (req.params.Params.includes('&')){
        [nombreCliente, nombreCiudad] = req.params.Params.split('&');
        result = clientes.filter(cliente => {
            return cliente.nombre.toLowerCase() == nombreCliente.toLowerCase() && 
            cliente.ciudad.toLowerCase() == nombreCiudad.toLowerCase()
        })
        if (result.length === 0){
            return res.send(`<h1 style="text-align:center">El/La cliente <span style="color:red; font-weight: bold;"> ${nombreCliente}</span> de la ciudad <span style="color:red; font-weight: bold;"> ${nombreCiudad}</span> no existe</h1>`)   
        }
    }
    else{
        nombreCliente = req.params.Params
        result = clientes.filter(cliente => cliente.nombre.toLowerCase() == nombreCliente.toLowerCase())
        if (result.length === 0){
            return res.send(`<h1 style="text-align:center">El/La cliente <span style="color:red; font-weight: bold; "> ${nombreCliente}</span> no existe</h1>`)
        }
    }
    res.send(JSON.stringify(result))
	// console.log("TCL: req.params.nombreCiudadParam", req.params)
	// console.log("TCL: result", result)

} );

app.get('/api/clientes/:nombreClienteParam/:ciudadParam',(req, res) =>{
    const nombreCliente = req.params.nombreClienteParam
    const nombreCiudad = req.params.ciudadParam

    const result = clientes.filter(cliente => {
        return cliente.nombre.toLowerCase() == nombreCliente.toLowerCase() && 
            cliente.ciudad.toLowerCase() == nombreCiudad.toLowerCase()
    })
    if (result.length === 0){
        return res.send(`<h1 style="text-align:center">El/La cliente <span style="color:red; font-weight: bold;"> ${nombreCliente}</span> de la ciudad <span style="color:red; font-weight: bold;"> ${nombreCiudad}</span> no existe</h1>`)   
    }
    res.send(JSON.stringify(result))
} );

app.get('/api/clientes/ciudad/:nombreCiudadParam',(req, res) =>{
    const nombreCiudad = req.params.nombreCiudadParam
	// console.log("TCL: req.params.nombreCiudadParam", req.params)

    const result = clientes.filter(cliente => cliente.ciudad.toLowerCase() == nombreCiudad.toLowerCase())
	// console.log("TCL: result", result)
    res.send(JSON.stringify(result))
} );

// Set the directory to the static files like images, css, js and other files.
app.use(express.static('static'))

app.use((req, res) =>{
    res.status(404).sendFile('./static/404.html', {root: __dirname})
});

app.listen(PUERTO, () => console.log(`Escuchando en: http://localhost:${PUERTO}`));