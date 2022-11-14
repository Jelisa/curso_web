// Import the required packages
const express = require('express');
const {argv} = require('process');
const path = require('path');

// Import the required JSON files
const ESTUDIANTES = require('./datos/estudiantes.json')

// Define constants with the needed information
const PORT = argv[2];
const PUBLIC_FILES = "public"

// Generate the server
const APP = express();

// Setting the static files path
APP.use(express.static(PUBLIC_FILES))

// EJERCICIO 2
// API for email search
APP.get('/:email', (req, res) =>{
    // The email to query
    const emailQuery = req.params.email
    // A basic email pattern to check the email is correct
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailQuery.match(emailPattern)){
        // If no email has been provided give the 404.html page
        return res.sendFile(path.join(__dirname, PUBLIC_FILES, '404.html'));
    }
    // Get the students with a matching email without taking into consideration the capitalization.
    const results = ESTUDIANTES.filter(estudiante => estudiante.email.toLowerCase() == emailQuery.toLowerCase());
    // If there's no result send an erro message
    if (results.length === 0){
        return res.send(`No existe ningun estudiante con el email: ${emailQuery}`);
    }
    // Return the results.
    res.json(results)
})

APP.get('/api/estudiantes',(req, res) => {
    console.log("🚀 ~ file: index.js ~ line 21 ~ APP.get ~ req", req.query)
    // EJERCICIO 3.
    //  Check for the query: http://localhost:3030/api/estudiantes?mayor=N where N is a number
    if (req.query.mayor){
        return res.send(filterDataByGrade(ESTUDIANTES, req.query.mayor, 'over'));
    }
    // EJERCICIO 4.
    //  Check for failing students via the query: http://localhost:3030/api/estudiantes?menor=8
    if (req.query.menor){
        const results = filterDataByGrade(ESTUDIANTES, req.query.menor, 'under')
        results.sort((a,b) => b.edad - a.edad);
        return res.send(results);
    }
    // EJERCICIO 1.
    // Sort the students by surname alphabetically from A to Z if the surname is the same use the name.
    ESTUDIANTES.sort((a, b) => {
        let order =  a.apellidos.localeCompare(b.apellidos);
        if (order == 0){
            return a.nombre.localeCompare(b.nombre);
        }
        else{
            return order;
        }
    })
    // console.log("🚀 ~ file: index.js ~ line 23 ~ APP.get ~ ESTUDIANTES", ESTUDIANTES[0])
    res.json(ESTUDIANTES);
})

// EJERCICIO 5
APP.get('/api/estudiantes/ranking', (req, res) =>{
    // Sort the students by grade and then by age.
    ESTUDIANTES.sort((a,b) => {
        let order = b.nota - a.nota;
        if (order == 0){
            order = b.edad - a.edad;
        }
        return order
    });
    res.json(ESTUDIANTES)
})

// What to do with none defined directions
APP.get('*', (req, res) =>{
    res.status(404).sendFile(path.join(__dirname, PUBLIC_FILES, '404.html'))
})

// A message to know where the server is listening.
APP.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))



function filterDataByGrade(data, thresholdNumber, type){
    /** A function to filter the data using a threshold.
     * @param {Object} data - An array containing the data to filter
     * @param {Number} thresholdNumber- A number to use as threshold for filtering the data
     * @param {Number} type - A string that should be in (over, under) and indicates how to make the comparisson
     * @return The filtered data or an error message.
     */
    let filteredResults;

    // If the threshold is not a number return an error message
    if (isNaN(thresholdNumber)){
        filteredResults = `${thresholdNumber} is Not a valid grade!`;
    }
    else{
        if (type== 'over'){
            // filter the values that are over the threshold
            filteredResults = data.filter(element => element.nota > thresholdNumber);
            console.log(`${filteredResults.length} alumnos tienen una nota mayor a ${thresholdNumber}`)
        } else if (type == 'under'){
            // filter the values that are under the threshold
            filteredResults = data.filter(element => element.nota < thresholdNumber);
            console.log(`${filteredResults.length} alumnos tienen una nota menor a ${thresholdNumber}`)
        }
    }
    // Return the filtered data/ error message.
    return filteredResults;
}

module.exports = {
    filterDataByGrade,
    
}