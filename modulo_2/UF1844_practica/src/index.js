// Jelisa Iglesias
// Reemplaza la variable __dirname que desaparece al convertir el packete en módulo
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Load the required packages.
import {argv, env} from 'process';
import {join, dirname} from 'path';
import express from 'express';
import fs from 'fs';

// Constant to store the data path
const dataPath = './data/pacientes.json';

// Constant to store the port where the server is listening
const PORT = argv[2]|| env.PORT || 4000;

// Constant to store the address where the static data is stored
const HTML_RESOURCES = '../public/';

// Constant to store the application
const APP = express();

// Load the data from the json file into a constant variable
const JSON_INFO = loadJSONFileToObject(dataPath);

// Extract the table information from the JSON file
// Using filter we obtain the single element of type 'table' inside an array.
// to extract the data itsself we use index 0 and then the key data
const DATA = JSON_INFO.filter((element) => element.type === 'table')[0].data;

APP.use(express.static(join(__dirname,HTML_RESOURCES)));

APP.get('/', (req, res) => {
    res.sendFile(join(__dirname, HTML_RESOURCES, 'index.html'))
})

// EndPoint to show the patients 'surname, name' sorted by surname
// localhost:3000/api/pacientes
APP.get('/api/pacientes', (req, res) => {
    // Sort the patients by apellido
    DATA.sort((patientA, patientB) => patientA.apellido.localeCompare(patientB.apellido));
    // Obtain the lines to show 'apellido, nombre'
    const OUTPUT_TEXT_ARRAY = DATA.map(patient => `${patient.apellido}, ${patient.nombre}`);
    // Send the text to the site
    res.send(OUTPUT_TEXT_ARRAY.join("<br>"));
});

// Endpoint to show the patients by service. So far only 'urgencias' and 'consultas' are supported.
// localhost:3000/api/servicio/urgencias o localhost:3000/servicio/consultas
APP.get('/api/servicios/:servicio', (req, res) => {
    const selectedService = req.params.servicio;
    let output_text; // A String variable to store the ouput text 
    let output; // A variable to store the data to send in an Array / Object.
    // selectedService can be only 'urgencias' or 'consultas' otherwise an error message is sent.
    switch (selectedService){
        case 'consultas':
            output = DATA.filter(patient => patient.servicio == "consultas");
            output_text = JSON.stringify(output);
            break;
        case 'urgencias':
            output = DATA.filter(patient => patient.servicio == "urgencias");
            output_text = JSON.stringify(output);
            break;
        default:
            output_text = "No existe ningun servicio con ese nombre";
    }
    // Send the object as a JSON to the site
    res.send(output_text);
});

// Endpoint to filter the patients by nif .
// localhost:3000/api/pacientes/nif
APP.get('/api/pacientes/:nif', (req, res) => {
    const output = DATA.filter(patient => patient.nif == req.params.nif);
    // Send an error message if no patient is found.
    if (output.length == 0){
        return res.send("No existe ningun paciente con ese nif");
    }
    // Send the object as a JSON to the site
    res.json(output);
});

// Endpoint to sort the patients by city.
// localhost:3000/api/ciudades
APP.get('/api/ciudades', (req, res) => {
    DATA.sort((patientA, patientB) => patientA.ciudad.localeCompare(patientB.ciudad));
    // Send the object as a JSON to the site
    res.json(DATA);
});

// Endpoint to show the patients from the 
// localhost:3000/api/ciudades/ciudad
APP.get('/api/ciudades/:ciudad', (req, res) => {
    const output = DATA.filter(patient => patient.ciudad.toLowerCase() == req.params.ciudad.toLowerCase())
    if (output.length === 0){
        return res.send("No consta ningun paciente de esa ciudad");
    }
    // Send the object as a JSON to the site
    res.json(output);
});

// Endpoint to show the number of patients for each city.
// localhost:3000/api/pacientes‐ciudad
APP.get('/api/pacientes-ciudad', (req, res) => {
    // Obtain the cities names by creating a set from the whole list of patients' cities.
    const ciudades = new Set(DATA.map(patient => patient.ciudad)) 
    // If no city has been found send an error
    if (ciudades.size === 0){
        return res.send("No consta ningun paciente con ciudad asignada.")
    }
    // Object to store the number of patients by city
    const output = {}
    // For each city assign the number of patients using
    for (let ciudad of ciudades){
        output[ciudad] = DATA.filter(patient => patient.ciudad === ciudad).length;
    }
    // Send the object as a JSON to the site
    res.json(output)    
});

// Mostrar la página 404.html cuando se introduza una url inexistente
// APP.use((req, res) => {
//     console.log('Ruta incorrecta');
//     res.status(404).sendFile(join(__dirname, HTML_RESOURCES, '404.html'));
// });

// Wake up the server.
APP.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));


function loadJSONFileToObject(filepath){
    /**A function to read and parse JSON files
     * @param {string} filepath - The full path including the name of the file to read.
     * @return  {Object} A object containing the information of the JSON file
     */
    const fileText = fs.readFileSync(filepath, 'latin1');
    return JSON.parse(fileText)
}