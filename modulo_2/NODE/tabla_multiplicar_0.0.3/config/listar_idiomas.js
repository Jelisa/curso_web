const fs = require("fs");

const TABLA_IDIOMAS = {
    "cat" : "Taula de multiplicar del",
    "esp" : "Tabla de multiplicar del",
    "eng" : "Multiplication table of"
};

const IDIOMAS_STRING = JSON.stringify(TABLA_IDIOMAS);

fs.writeFileSync('idiomas.json', IDIOMAS_STRING)