// Jelisa Iglesias

const argv = require('./config/yargs.js');
const fs = require('fs')
const process = require('process')
const {ALUMNADO, ASISTENCIA, NOTAS} = loadJSONFileToObject("./config/data_filenames.json");

checkFileExists(ALUMNADO, 'exit');

if (argv.nombre !== undefined){
    checkStudentResgistration(argv.nombre)
}

// console.log(argv.calificacion)

if (argv.calificacion !== undefined){
    addQualification(argv.nombre, argv.calificacion);
}
if (argv.ponfalta !== undefined){
    addAbsence(argv.nombre, argv.ponfalta);
}
if (argv.quitafalta !== undefined){
    removeAbsence(argv.nombre, argv.quitafalta);
}
if (argv.informe === ''){
    const reportTitle = `./data/informe_${new Date().toLocaleDateString().replaceAll('/','_')}.txt`    
    generateReport(reportTitle)
}
else if (argv.informe !== undefined){
    generateReport(argv.informe)
}

function generateReport(reportFilename, studentsFilename=ALUMNADO, gradesFilename=NOTAS, abscencesFilename=ASISTENCIA ) {
    /**
     * @param {String} studentsFilename -
     * @param {String} gradesFilename -
     * @param {String} abscencesFilename -
     */

    let students;
    let grades = {}, abscences = {};
    if (checkFileExists(studentsFilename, 'exit')){
        students = loadJSONFileToObject(studentsFilename);
        if (checkFileExists(gradesFilename)){
            grades = loadJSONFileToObject(gradesFilename);
        }
        if (checkFileExists(abscencesFilename)){
            abscences = loadJSONFileToObject(abscencesFilename);
        }
        const title = 'Alumnado del curso\n';
        let reportString = title + '-'.repeat(title.length) + '\n';
        students.forEach( student => {
            let alumno = [student.nombre, student.apellido].join(" ");
            reportString += alumno + '\n'
            if(typeof(grades[alumno]) === 'undefined'){
                reportString += `calificación: pendiente\n`;
            }
            else{
                reportString += `calificación: ${grades[alumno]}\n`;
            }
            if(typeof(abscences[alumno]) === 'undefined'){
                reportString += `Faltas de asistencia: ninguna\n`;
            }
            else{
                reportString += `Faltas de asistencia: ${abscences[alumno].join(', ')}\n`;
            }
            reportString += '\n'
        })
        fs.writeFileSync(reportFilename, reportString)
    }
    
}

function removeAbsence(studentName, date){
    /**A function to remove a student abscence from the file ASISTENCIA
     * @param {String} studentName - The student full name.
     * @param  {String} date - A string containing the date.
     */

    // Check for the date's format, if it's invalid the program will stop
    checkDateFormat(date);
    // Define a variable that will store the contents to write onto the file ASISTENCIA
    let studentsAbscences;
    if (checkFileExists(ASISTENCIA, 'warning')){
        // check if the file ASISTENCIA exists and load it into memory
        studentsAbscences = loadJSONFileToObject(ASISTENCIA);

        let currentAbscences = checkStudentAbscences(studentName, date, studentsAbscences)
        console.log("🚀 ~ file: app.js ~ line 39 ~ removeAbsence ~ currentAbscences", currentAbscences)

        if (currentAbscences[0] === "repetida"){ // The date you want to remove is present
            // Let's remove  the abscence
            currentAbscences = studentsAbscences[studentName] // THis assignment is made by refernces
            currentAbscences.splice(currentAbscences.indexOf(date)) // In here we are modifiying the current variable and th original one too.
        }
        else if (currentAbscences[0] === ["ninguna"]){
            console.warn(`Check your data: The student '${studentName}' doesn't have any abscence recorded, so it cannot be removed.`)
        }
        else{
            console.warn(`Check your data: The student '${studentName}' doesn't have an abscence recorded on the '${date}' thus it cannot be removed.`)
        }
        writeJSONFileFromObject(ASISTENCIA, studentsAbscences)
    }else{
        console.warn("Warning: cannot remove abscences if none have been assigned.")
    }
 

}

function addAbsence(studentName, date){
    /**A function to add an Abscence to the students into the file ASISTENCIA
     * @param {String} studentName - The student full name.
     * @param  {String} date - A string containing the date.
     */

    // Check for the date's format, if it's invalid the program will stop
    checkDateFormat(date);
    // Define a variable that will store the contents to write onto the file ASISTENCIA
    let studentsAbscences;
    if (checkFileExists(ASISTENCIA, 'warning')){
        // check if the file ASISTENCIA exists and load it into memory
        studentsAbscences = loadJSONFileToObject(ASISTENCIA);

        let currentAbscences = checkStudentAbscences(studentName, date, studentsAbscences, true)
        if (currentAbscences[0] === 'ninguna'  ){
            studentsAbscences[studentName] = [date]
        }
        else if (currentAbscences[0] !== 'repetida'){
            // // se matiene la información que está y listo
            // studentsAbscences[studentName] = studentsAbscences[studentName]
            studentsAbscences[studentName].push(date)
        }
    }
    else{
        console.log(`Creating the file: ./${ASISTENCIA}`)
        studentsAbscences = {[studentName] : [date]}
    }
    writeJSONFileFromObject(ASISTENCIA, studentsAbscences)
}

function checkStudentAbscences(studentName, date, asistencia, warningRepetition=false){
    /**A function to check the students abscences.
     * @param {String} studentName - The name of the student as found in the abscence object
     * @param {String} date -
     * @param {Object} asistencia - 
     * @param {Boolean} warningRepetition - 
     */
    let faltas = asistencia[studentName];
    if( faltas ===  undefined){
        faltas = ["ninguna"];
    }
    else if (faltas.includes(date)) {
        if (warningRepetition){
            console.warn(`Warning: The date '${date}' has been introduced as an Abscence before, cannot be repeated.`);
        }
        faltas = ["repetida"];
    }
    return faltas;
}

function addQualification(studentName, grade){
    /**
     * @param {String} studentName - The student name to add to the file NOTAS
     */

    // Define avariable to store de information to write to the file.
    let studentsGradeObject;
    
    // If the file exists load it into an Object and add/modify the student's grade
    if (checkFileExists(NOTAS)){
        studentsGradeObject = loadJSONFileToObject(NOTAS)
        studentsGradeObject[studentName] = grade
    }
    // If the file doesn't exist create a new object with the information
    else{
        studentsGradeObject = {[studentName]: grade}
    }

    // write the information into the JSON file.
    writeJSONFileFromObject(NOTAS, studentsGradeObject)
}

function checkDateFormat(dateString){
    /** A function to check the validity of a date string. 
     * Stops the program if its format is invalid
     * @param {String} dateString - The string whose format should be DD-MM-AAAA
     */
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (dateString.match(regex) === null) {
        console.error(`Invalid date '${dateString}'.\n The format should be DD-MM-AAAA.`);
        process.exit(1);
    }
    const englisFormatString = dateString.split('-').reverse().join("-");
    const date = new Date(englisFormatString);
    const timestamp = date.getTime();
    const year = date.getFullYear();
    if (typeof timestamp !== 'number' || Number.isNaN(timestamp) || year > new Date().getFullYear()) {
        console.error(`Invalid date '${dateString}'. Review the date numbers.`);
        process.exit(1);
    }
  
}

function checkStudentResgistration(studentFullName){
    /** A function to check whether a student is registered and exit the program if not
     * @param {string} studentFullName - The student's full name in the followin format: 'name surname'
     */
    // The name and the surname should be separated by a white space
    const [nombre, apellido] = studentFullName.split(' ');
    const alumnos = loadJSONFileToObject(ALUMNADO);
    const alumno_exists = alumnos.filter(alumno => 
        alumno.nombre.toLowerCase() == nombre.toLowerCase() &&
            alumno.apellido.toLowerCase() == apellido.toLowerCase())   
    if (alumno_exists.length == 0){
        console.error(`El alumno '${studentFullName}' no está registrado.\nRevisa el nombre.`)
        process.exit(1)
    }
}

function writeJSONFileFromObject(filename, content){
    /** A function to write JSON files from objects 
     * @param {String} filename - The file to write to
     * @param {Object} content - An object containing the information to write in JSON format
     */
    const contentString = JSON.stringify(content)
    fs.writeFileSync(filename, contentString)
}

function loadJSONFileToObject(filepath){
    /**A function to read and parse JSON files
     * @param {string} filepath - The full path including the name of the file to read.
     * @return  {Object} A object containing the information of the JSON file
     */
    const fileText = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(fileText)
}

function checkFileExists(filepath, exit=false){
    /**
     * @param {string} filepath - The path to the file to check
     * @param {boolean} exit - Whether to exit the program if the file doesn't exists or not.
     * @return {boolean} Whether the file exists or not.
     */
    let fileExists = true;
    
    if (!fs.existsSync(filepath)){
        switch (exit) {
            case 'exit':
                console.error(`Error: The file '${filepath}' is critical and it's missing`)
                process.exit(1)
            case 'warning':
                console.warn(`Warning: The file '${filepath}' is missing.`)
                fileExists = false;
                break;
            default:
                fileExists = false;
        }
    }
    return fileExists;
}