// Jelisa Iglesias
// Import the needed modules
const process = require("process");
const fs = require('fs');

const MULTIPLICATION_TABLE_BASE = process.argv[2] // The program will only accept one number, thus it can be selected this way. NOT SCALABLE

const filename = `tabla_multiplicar_${MULTIPLICATION_TABLE_BASE}.txt`

/* Security checks */
// check for the MULTIPLICATION_TABLE_BASE not to be undefined
if (MULTIPLICATION_TABLE_BASE === undefined) {
    throw "The base hasn't been defined.";
}
// Check there's only one number to be processed.
if (process.argv.length > 3){
    throw "The program only accepts one number at a time.";
}

// Create the table header
let tablaMultiplicar = "=".repeat(32) + `\n== Tabla de multiplicar del ${MULTIPLICATION_TABLE_BASE} ==`
tablaMultiplicar += `\n` + "=".repeat(32);

// Create the table itself
for (let i = 1; i <= 10; i++) {
    tablaMultiplicar += `\n${MULTIPLICATION_TABLE_BASE} x ${i} = ${MULTIPLICATION_TABLE_BASE * i}`
}
// Add the ending line
tablaMultiplicar += "\n" + "=".repeat(32)

// Create the file wherever the file is executed. If it scales some security checks should be made for our own future sanity, like being in a writable folder, avoid system folders, etc.
fs.writeFileSync(filename, tablaMultiplicar)
