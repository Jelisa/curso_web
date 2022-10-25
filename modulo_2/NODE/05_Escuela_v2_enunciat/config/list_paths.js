const fs = require("fs");

const DEFAULT_FILES = {
    'REGISTRO_ALUMNOS': 'data/alumnos.json',
    'INFORMACION_ALUMNOS': 'data/alumnos_info.json'
}

const IDIOMAS_STRING = JSON.stringify(DEFAULT_FILES);

fs.writeFileSync('data_filenames.json', IDIOMAS_STRING)