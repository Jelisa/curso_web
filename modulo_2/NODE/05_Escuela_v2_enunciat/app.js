// Jelisa Iglesias

const argv = require('./config/yargs.js');
const fs = require('fs')
const process = require('process')
const {REGISTRO_ALUMNOS, INFORMACION_ALUMNOS} = loadJSONFileToObject("./config/data_filenames.json");

checkFileExists(REGISTRO_ALUMNOS, 'exit');

if (argv.nombre !== undefined){    
    argv.nombre = checkStudentResgistration(argv.nombre)
}
if (argv.calificacion !== undefined){
    addQualification(argv.nombre, argv.calificacion);
}
if (argv.ponfalta !== undefined){
    addAbsence(argv.nombre, argv.ponfalta);
}
if (argv.quitafalta !== undefined){
    removeAbsence(argv.nombre, argv.quitafalta);
}
if (argv.informe !== undefined){
    if (argv.nombre != undefined){
        if (argv.informe === ''){
            // If no filename has been provided but the option has been selected the following name will be used.
            const reportTitle = `./data/informe_${argv.nombre.toLowerCase().replaceAll(' ', '_')}_${new Date().toLocaleDateString().replaceAll('/','_')}.txt`    
            generateReport(reportTitle, true, argv.nombre)
        }
        else {
            generateReport(argv.informe, true, argv.nombre)
        }
    }
    else{
        if (argv.informe === ''){
            // If no filename has been provided but the option has been selected the following name will be used.
            const reportTitle = `./data/informe_${new Date().toLocaleDateString().replaceAll('/','_')}.txt`    
            generateReport(reportTitle, true)
        }
        else {
            generateReport(argv.informe, true)
        }
    }
}
if (argv.printReport){
    if(argv.nombre != undefined){
        generateReport('', false, argv.nombre)
    }
    else{
        generateReport()
    }
}

function generateReport(reportFilename='', writeReport=false, studentName='', studentsFilename=REGISTRO_ALUMNOS, studentsInfoFilename=INFORMACION_ALUMNOS) {
    /**
     * @param {String} reportFilename -
     * @param {Boolean} writeReport -
     * @param {String} gradesFilename -
     * @param {String} studentsInfoFilename -
     */

    //Variable that will store the students registry. If it can't be filled the program will fail, thus it doesn't need inizialization
    let students;

    //Variable that will store the abscences and grades, it may no be filled thus its inizialization to an empty object.
    let studentsInfo = {};

    if (checkFileExists(studentsFilename, 'exit')){
        students = loadJSONFileToObject(studentsFilename);
        if (checkFileExists(studentsInfoFilename)){
            studentsInfo = loadJSONFileToObject(studentsInfoFilename);
        }
        // variable that stores the report
        let reportString;

        // if no Student name has been given the program will generate the report for all students
        if (!studentName){
            const title = 'Alumnado del curso\n';
            reportString = title + '-'.repeat(title.length) + '\n';
            students.forEach( student => {
                let alumno = [student.nombre, student.apellido].join(" ");
                reportString += generateStudentReport(alumno, studentsInfo)
            })
        }
        // Otherwise if a name has been given the program will generate the report for that student
        else{
            const title = `Información estudiante: ${studentName}\n`;
            reportString = title + '-'.repeat(title.length) + '\n';
            reportString += generateStudentReport(studentName, studentsInfo)
        }
        if (argv.printReport){
            console.log('\n' + reportString)
        }
        if (writeReport){
            fs.writeFileSync(reportFilename, reportString)
        }
    }    
}

function generateStudentReport(studentName, studentInfo){
    /**
     * @param {String} studentName - a string containing the student name
     * @param {Object} studentInfo - contains the information of the students. 
     */
    let reportString = studentName + '\n'
    if(typeof(studentInfo[studentName]) === 'undefined'){
        reportString += `Calificación: pendiente\n`;
        reportString += `Faltas de asistencia: ninguna\n`;
    }
    else{
        if (studentInfo[studentName]['nota'] === undefined){
            reportString += `Calificación: pendiente\n`;
        }
        else{
            reportString += `calificación: ${studentInfo[studentName]['nota']}\n`;
        }
        if(typeof(studentInfo[studentName]['faltas']) === 'undefined'){
            reportString += `Faltas de asistencia: ninguna\n`;
        }
        else{
            // Lets change the dates format to make it easier to read.
			console.log("TCL: generateStudentReport -> studentInfo[studentName]['faltas']", studentInfo[studentName]['faltas'])
            const datesDMYformat = []
            studentInfo[studentName]['faltas'].forEach(date => datesDMYformat.push(reverseDate(date)))
            reportString += `Faltas de asistencia: ${datesDMYformat.join(', ')}\n`;
        }
    }
    reportString += '\n'
    return reportString
}

function removeAbsence(studentName, date){
    /**A function to remove a student abscence from the file INFORMACION_ALUMNOS
     * @param {String} studentName - The student full name.
     * @param  {String} date - A string containing the date.
     */

    // Check for the date's format, if it's invalid the program will stop, otherwise the format will be change to YYYY-MM-DD
    let dateFileFormat = checkDateFormat(date);
    // Define a variable that will store the contents to write onto the file INFORMACION_ALUMNOS
    let studentsAbscences;
    if (checkFileExists(INFORMACION_ALUMNOS, 'warning')){
        // check if the file INFORMACION_ALUMNOS exists and load it into memory
        studentsAbscences = loadJSONFileToObject(INFORMACION_ALUMNOS);

        if (studentsAbscences[studentName] !== undefined){
            let currentAbscences = checkStudentAbscences(studentsAbscences[studentName]['faltas'], dateFileFormat)
    
            if (currentAbscences[0] === "repetida"){ // The date you want to remove is present
                // Let's remove  the abscence
                currentAbscences = studentsAbscences[studentName]['faltas'] // THis assignment is made by references
                currentAbscences.splice(currentAbscences.indexOf(dateFileFormat)) // In here we are modifiying the current variable and th original one too.
            }
            else if (currentAbscences[0] === ["ninguna"]){ // If there's no abscence give a warning
                console.warn(`Check your data: The student '${studentName}' doesn't have any abscence recorded, so none can be removed.`)
            }
            else{ // This is the case where the student has abscenses but not on the day selected to remove
                const datesDMYformat = []
                currentAbscences.forEach(date => datesDMYformat.push(reverseDate(date)))
                console.warn(`Check your data: The student '${studentName}' doesn't have an abscence recorded on the '${date}' thus it cannot be removed.`)
                console.log(`${studentName} has the following abscences: ${datesDMYformat.join(', ')}`)
            }
            writeJSONFileFromObject(INFORMACION_ALUMNOS, studentsAbscences)
        }
        else{
            console.warn(`The student ${studentName} has no information recorded, thus they don't have abscences to remove.`)
        }
    }else{
        console.warn("Warning: cannot remove abscences if none have been assigned.")
    }
 

}

function addAbsence(studentName, date){
    /**A function to add an Abscence to the students into the file INFORMACION_ALUMNOS
     * @param {String} studentName - The student full name.
     * @param  {String} date - A string containing the date.
     */

    // Check for the date's format, if it's invalid the program will stop, otherwise the format will be change to YYYY-MM-DD
    let dateComputerFormat = checkDateFormat(date);
    // Define a variable that will store the contents to write onto the file INFORMACION_ALUMNOS
    let studentsAbscences;
    if (checkFileExists(INFORMACION_ALUMNOS, 'warning')){
        // check if the file INFORMACION_ALUMNOS exists and load it into memory
        studentsAbscences = loadJSONFileToObject(INFORMACION_ALUMNOS);
        if (studentsAbscences[studentName] === undefined){
            studentsAbscences[studentName] = {'faltas' :[dateComputerFormat]}
        }
        else{
            let currentAbscences = checkStudentAbscences(studentsAbscences[studentName]['faltas'], dateComputerFormat, true)
            //  Añadimos la fecha
            if (currentAbscences[0] === 'ninguna'  ){
                studentsAbscences[studentName]['faltas'] = [dateComputerFormat]
            }
            else if (currentAbscences[0] !== 'repetida'){
                studentsAbscences[studentName]['faltas'].push(dateComputerFormat)
            }
        }
        // Let's sort the dates chronologically
        studentsAbscences[studentName]['faltas'].sort()
    }
    else{
        console.log(`Creating the file: ./${INFORMACION_ALUMNOS}`)
        studentsAbscences = {[studentName] : {'faltas' :[dateComputerFormat]}}
    }
    writeJSONFileFromObject(INFORMACION_ALUMNOS, studentsAbscences)
}

function checkStudentAbscences(faltas, date,  warningRepetition=false){
    /**A function to check the students abscences.
     * @param {Array} faltas - An array containing the dates of Abscence
     * @param {String} date - The date string to look for
     * @param {Boolean} warningRepetition - A flag to print a warning if the date is already present in faltas
     * @return {Array} An array containing the dates of Abscences, ninguna or "repetida" if its already in.
     */
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
     * @param {String} studentName - The student name to add to the file INFORMACION_ALUMNOS
     * @param {Int} grade - The numeric grade to add to the student.
     */

    // Define avariable to store de information to write to the file.
    let studentsGradeObject;
    
    // If the file exists load it into an Object and add/modify the student's grade
    if (checkFileExists(INFORMACION_ALUMNOS, 'warning')){
        studentsGradeObject = loadJSONFileToObject(INFORMACION_ALUMNOS)
        if (studentsGradeObject[studentName] ===  undefined){
            studentsGradeObject[studentName] = {'nota': grade}
        }
        else{
            studentsGradeObject[studentName]['nota'] = grade
        }
    }
    // If the file doesn't exist create a new object with the information and create the file.
    else{
        console.log(`Creating the file: ./${INFORMACION_ALUMNOS}`)
        studentsGradeObject = {[studentName]:{'nota': grade}}
    }

    // write  the information into the JSON file. It will create the file of ot doesn't exist.
    writeJSONFileFromObject(INFORMACION_ALUMNOS, studentsGradeObject)
}

function checkDateFormat(dateString){
    /** A function to check the validity of a date string. 
     * Stops the program if its format is invalid
     * @param {String} dateString - The string whose format should be DD-MM-AAAA
     */

    // Check the basic input data format
    const inputDateFormat = /^\d{2}-\d{2}-\d{4}$/;
    if (dateString.match(inputDateFormat) === null) {
        console.error(`Invalid date '${dateString}'.\n The format should be DD-MM-AAAA.`);
        process.exit(1);
    }
    // Let's modify the date to the YYYY-MM-DD format so it can used as a Date
    const englishFormatString = reverseDate(dateString)
    const date = new Date(englishFormatString);
    const timestamp = date.getTime();
    const year = date.getFullYear();
    if (typeof timestamp !== 'number' || isNaN(timestamp) || year > new Date().getFullYear()) {
        console.error(`Invalid date '${dateString}'. Review the date numbers.`);
        process.exit(1);
    }
    return date.toLocaleDateString('en-CA')
}

function reverseDate(date){
    /** A function to change between the YYYY-MM-DD and DD-MM-YYYY date format
     * @param {String} date - The date in one of the formats
     * @return {String} The reversed date
     */
    const DMYformat = /^\d{2}-\d{2}-\d{4}$/;
    const YMDformat = /^\d{4}-\d{2}-\d{2}$/;
    if (date.match(DMYformat) == null && date.match(YMDformat) == null){
        console.error(`The date '${date}' doesn't have a valid format`)
        process.exit(1)
    }
    // We modify the order by spliting the date, reversing the order and rejoining it.
    return date.split('-').reverse().join('-')
}

function checkStudentResgistration(studentFullName){
    /** A function to check whether a student is registered and exit the program if not
     * @param {String} studentFullName - The student's full name in the followin format: 'name surname'
     * @return {String} A string containing the student name like it's present in the registry
     */
    // The name and the surname should be separated by a white space
    const [nombre, apellido] = studentFullName.split(' ');
    // El Json original tiene una array con los nombres
    const alumnos = loadJSONFileToObject(REGISTRO_ALUMNOS); 
    // alumno_exists it's an array with the matchin names, it should only contain 1 student.   
    const alumno_exists = alumnos.filter(alumno => 
        alumno.nombre.toLowerCase() == nombre.toLowerCase() &&
        alumno.apellido.toLowerCase() == apellido.toLowerCase())   
    // Give an error if there's no match or multiple matches
    if (alumno_exists.length == 0){
        console.error(`El/La alumno/a '${studentFullName}' no está registrado/a.\nRevisa el nombre.`)
        process.exit(1)
    }
    else if (alumno_exists.length >1){
        console.error(`El/La alumno/a '${studentFullName}' está repetido/a en el registro.`)
        process.exit(1)
    }
    const student_correct_name = `${alumno_exists[0].nombre} ${alumno_exists[0].apellido}`
    return student_correct_name
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

    // A variable to save whether the file exists or not, by default it's true
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