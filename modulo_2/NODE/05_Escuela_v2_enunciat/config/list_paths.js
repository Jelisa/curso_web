const fs = require("fs");

const DEFAULT_FILES = {
    'ALUMNADO': 'data/alumnos.json',
    'ASISTENCIA': 'data/faltas.json',
    'NOTAS': 'data/calificaciones.json',
}

const IDIOMAS_STRING = JSON.stringify(DEFAULT_FILES);

fs.writeFileSync('data_filenames.json', IDIOMAS_STRING)