// Jelisa Iglesias

// Import the needed modules
const process = require("process");
const fs = require('fs');
const { argv } = require("process");
const colors = require('colors')

// Read the languages information.
const LANGUAGES_FILENAME = "config/idiomas.json";
const LANGUAGES_OBJECT = JSON.parse(fs.readFileSync(LANGUAGES_FILENAME))
const AVAILABLE_LANGUAGES = Object.keys(LANGUAGES_OBJECT)

// PARSING ARGUMENTS ....T_T'
const MULTIPLICATION_TABLE_BASE = parseInt(findArgument('num')); //= argv[2] // The program will only accept one number, thus it can be selected this way. NOT SCALABLE // ALREADY TRICKY

const LANGUAGE_SELECTED = findArgument('lang') // The program will only accept one number, thus it can be selected this way. NOT SCALABLE // BAD IDEA... IT'S GONA BE REDONE....

/* Security checks */
// check for the MULTIPLICATION_TABLE_BASE not to be undefined
if (isNaN(MULTIPLICATION_TABLE_BASE)){
    console.log("The 'num' parameter is mandatory and it should be a number".red)
    process.exit(1)
}
if (LANGUAGE_SELECTED === undefined){
    console.log('language problem')
}

// SET THE TITLE IF A SUPPORTED LANGUAGE HAS BEEN SELECTED
let title;
try {
    title = selectTitle(LANGUAGE_SELECTED.toLowerCase());
} catch (error) {
    console.log(error)
    process.exit(1)
}

// SET THE OUPUT FILES AND FOLDERS
let output_folder = "output_txt";
checkAndCreateFolder(output_folder);
output_folder += `/${LANGUAGE_SELECTED.toUpperCase()}`;
checkAndCreateFolder(output_folder);

const OUTPUT_FILENAME = title.toLowerCase().replaceAll(" ","_")

const filename = `${output_folder}/${OUTPUT_FILENAME}_${MULTIPLICATION_TABLE_BASE}_${LANGUAGE_SELECTED}.txt`

// Create the table header
let tablaMultiplicar = "=".repeat(32) + `\n== ${title} ${MULTIPLICATION_TABLE_BASE} ==`
tablaMultiplicar += `\n` + "=".repeat(32);

// Create the table itself
for (let i = 1; i <= 10; i++) {
    tablaMultiplicar += `\n${MULTIPLICATION_TABLE_BASE} x ${i} = ${MULTIPLICATION_TABLE_BASE * i}`
}
// Add the ending line
tablaMultiplicar += "\n" + "=".repeat(32)

// Create the file wherever the file is executed. If it scales some security checks should be made for our own future sanity, like being in a writable folder, avoid system folders, etc.
fs.writeFileSync(filename, tablaMultiplicar)

if (!argv.includes('--noconsole')){
    console.log(tablaMultiplicar.bold.cyan)
}

function selectTitle(language) {
    if (!AVAILABLE_LANGUAGES.includes(language)) {
        let errorMessage = `The program doesn't support the language '${language}'`.red
        errorMessage += `.\nPlease select one of the followings: ${AVAILABLE_LANGUAGES.join(", ").underline.bold.green}`
        throw errorMessage
    }
    return LANGUAGES_OBJECT[language]
}

function checkAndCreateFolder(folderName) {
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName)
    }
}

function findArgument(argName){
    let value;
    argv.filter(
        arg => {
            if (arg.includes(argName)){
                value = arg.split('=')[1]
            }
        }
    )
    return value
}