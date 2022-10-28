// load the package into memory, it needs to be pre-installed via npm
const express = require('express');
const process = require('process');
const path = require('path')
const fs = require('fs');
const { info } = require('console');

// app its the accorded name for express.
const app = express();


// Assign the connection port
// sintaxis 1
// const {PUERTO = 3000} = process.env;
// sintaxis 2
const PUERTO = process.env.PORT || 3000;

// Import the clientelle data
const informacion = require('./data/datos-empresa.json');
// const informacion = loadJSONFileToObject('./data/datos-empresa.json');

// Set the directory to the static files like images, css, js and other files.
app.use(express.static('static'))


const DIR_HTML = "static";

// app.get('/', function (req, res) {
//     // // Send text to the site's root
//     res.sendFile('./static/index.html', { root: __dirname })
// })

app.get('/api', (req, res) => {
    res.json(informacion)
})

app.get('/alumnos', (req, res) => {
    res.json(informacion)
})

app.get('/api/alumnos', (req, res) => {
    if (req.query.nombreCliente){
        const nombreQuery = req.query.nombreCliente
        const result= informacion.clientes.filter(cliente => cliente.nombre.toLowerCase() == nombreQuery.toLowerCase());
        return res.json(result)
    }
    res.json(informacion)
})

app.get('/clientes', function (req, res) {
    // // Send text to the clientes page.
    res.sendFile(path.join(__dirname, DIR_HTML, 'clientes.html'))
})

app.get('/api/clientes',(req, res) =>{
    res.send(JSON.stringify(informacion.clientes))
} );

app.get('/api/clientes/:Params',(req, res) =>{
    let nombreCliente, nombreCiudad, result;
    console.log(req.query)
    if (req.params.Params.includes('&')){
        [nombreCliente, nombreCiudad] = req.params.Params.split('&');
        result = informacion.clientes.filter(cliente => {
            return cliente.nombre.toLowerCase() == nombreCliente.toLowerCase() && 
            cliente.ciudad.toLowerCase() == nombreCiudad.toLowerCase()
        })
        if (result.length === 0){
            return res.send(`<h1 style="text-align:center">El/La cliente <span style="color:red; font-weight: bold;"> ${nombreCliente}</span> de la ciudad <span style="color:red; font-weight: bold;"> ${nombreCiudad}</span> no existe</h1>`)   
        }
    }
    else{
        nombreCliente = req.params.Params
        result = informacion.clientes.filter(cliente => cliente.nombre.toLowerCase() == nombreCliente.toLowerCase())
        if (result.length === 0){
            return res.send(`<h1 style="text-align:center">El/La cliente <span style="color:red; font-weight: bold; "> ${nombreCliente}</span> no existe</h1>`)
        }
        if (req.query.ordenar == "ciudad"){
            const resultadoOrdenadoCiudad = result.sort((a,b) => a.ciudad.localeCompare(b.ciudad))
            return res.send(JSON.stringify(resultadoOrdenadoCiudad))
        }
    }
    res.send(JSON.stringify(result))
} );

app.get('/api/clientes/ciudad/:nombreCiudadParam',(req, res) =>{
    const nombreCiudad = req.params.nombreCiudadParam
	console.log("TCL: req.params.nombreCiudadParam", req.params)
    const result = informacion.clientes.filter(cliente => cliente.ciudad.toLowerCase() == nombreCiudad.toLowerCase())
    res.send(JSON.stringify(result))
} );

app.get('/api/clientes/:nombreClienteParam/:ciudadParam',(req, res) =>{
    const nombreCliente = req.params.nombreClienteParam
    const nombreCiudad = req.params.ciudadParam
    const result = informacion.clientes.filter(cliente => {
        return cliente.nombre.toLowerCase() == nombreCliente.toLowerCase() && 
            cliente.ciudad.toLowerCase() == nombreCiudad.toLowerCase()
    })
    if (result.length === 0){
        return res.send(`<h1 style="text-align:center">El/La cliente <span style="color:red; font-weight: bold;"> ${nombreCliente}</span> de la ciudad <span style="color:red; font-weight: bold;"> ${nombreCiudad}</span> no existe</h1>`)   
    }
    res.send(JSON.stringify(result))
} );

app.get('/api/productos',(req, res) => {
    res.send(JSON.stringify(informacion.productos))
});

app.get('/api/productos/highend', (req, res) =>{
    const precioMedio = informacion.productos.reduce((total, b) => total + b.precio, 0) / informacion.productos.length;

    const results = informacion.productos.filter(producto => producto.precio > precioMedio)
	// console.log("TCL: results", results)
    res.send(JSON.stringify(results))
})

app.get('/api/productos/:letraInicial', (req, res) =>{
    const letraInicia = req.params.letraInicial
	// console.log("TCL: temporada", res.params)
    const results = informacion.productos.filter(producto => producto.nombre[0] == letraInicia)
	console.log("TCL: results", results)
    if (results.length == 0){
        return res.send(`<h1 style="text-align:center">No hay productos que empiecen por la letra <span style="color:red; font-weight: bold;"> ${letraInicia}</span></h1>`)   
    }
    res.send(JSON.stringify(results))
})

app.get('/api/productos/temporada/:temporada', (req, res) =>{
    const temporada = req.params.temporada
	// console.log("TCL: temporada", res.params)
    const results = informacion.productos.filter(producto => producto.temporada == temporada)
	// console.log("TCL: results", results)
    if (results.length == 0){
        return res.send(`<h1 style="text-align:center">No hay productos de la temporada <span style="color:red; font-weight: bold;"> ${temporada}</span></h1>`)   
    }
    res.send(JSON.stringify(results))
})


app.get('*', (req, res) =>{
    res.status(404).sendFile(path.join(__dirname, DIR_HTML, '404.html'))
});

app.listen(PUERTO, () => console.log(`Escuchando en: http://localhost:${PUERTO}`));

function loadJSONFileToObject(filepath){
    /**A function to read and parse JSON files
     * @param {string} filepath - The full path including the name of the file to read.
     * @return  {Object} A object containing the information of the JSON file
     */
    const fileText = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(fileText)
}