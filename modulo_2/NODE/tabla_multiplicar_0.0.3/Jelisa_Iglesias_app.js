// Jelisa Iglesias

// Import the needed modules
const fs = require('fs');
const colors = require('colors');
const argv = require('./config/yargs.js');


// // SET THE TITLE IF A SUPPORTED LANGUAGE HAS BEEN SELECTED
let title;
try {
    title = selectTitle(argv.idioma.toLowerCase());
} catch (error) {
    console.log(error)
    process.exit(1)
}

const TABLA = createTable(title, argv.o)

if (!argv.noconsole){
    console.log(TABLA.bold.cyan)
}

if (!argv.t){
    createTXT(argv.dirtxt, title, argv.o, argv.idioma, TABLA)
}


function selectTitle(language) {
    /** A function to obatain the header of the file, if the selected language is incorrect it will terminate the application
     * @param {string} language - A string that should equal to one of the supported languages keywords.
     */
    // // Read the languages information.
    const LANGUAGES_FILENAME = "config/idiomas.json";
    const LANGUAGES_OBJECT = JSON.parse(fs.readFileSync(LANGUAGES_FILENAME)) 
    const AVAILABLE_LANGUAGES = Object.keys(LANGUAGES_OBJECT) // This is useful to generate the error message
    if (!AVAILABLE_LANGUAGES.includes(language)) {
        let errorMessage = `The program doesn't support the language '${language}'`.red
        errorMessage += `.\nPlease select one of the followings: ${AVAILABLE_LANGUAGES.join(", ").underline.bold.green}`
        throw errorMessage
    }
    return LANGUAGES_OBJECT[language]
}

function checkAndCreateFolder(folderName) {
    /** A function to create a folder if it doesn't exis already.
     * @param {string} folderName - The directory to create.
     */
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName, {recursive : true})
    }
}

function createTable(header, base){
    /**
     * @param {string} header - The text to use as a header.
     * @param {int} base - The number to create the multiplication table.
     */
    // Create the table header
    let tablaMultiplicar = "=".repeat(32) + `\n== ${header} ${base} ==`
    tablaMultiplicar += `\n` + "=".repeat(32);

    // Create the table itself
    for (let i = 1; i <= 10; i++) {
        tablaMultiplicar += `\n${base} x ${i} = ${base * i}`
    }
    // Add the ending line
    tablaMultiplicar += "\n" + "=".repeat(32)
    return tablaMultiplicar;
}

function createTXT (baseDirectory, baseFileName, number, idioma, texto){
    /** A function to create the .txt output file
     * @param {string} baseDirectory - The folder that should contain all the output files
     * @param {string} baseFileName - A string containing the basic file name
     * @param {Int} number - The number to add to the filename
     * @param {string} idioma - the name code to use for the output
     * @param {string} texto - 
     */
    // SET THE OUPUT FILES AND FOLDERS
    const output_folder = `${baseDirectory}/${idioma.toUpperCase()}`;
    checkAndCreateFolder(output_folder);

    const OUTPUT_FILENAME = baseFileName.toLowerCase().replaceAll(" ","_")

    const filename = `${output_folder}/${OUTPUT_FILENAME}_${number}_${idioma}.txt`

    // Create the file wherever the file is executed. If it scales some security checks should be made for our own future sanity, like being in a writable folder, avoid system folders, etc.
    fs.writeFileSync(filename, texto)
}