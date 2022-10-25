const { describe } = require('yargs');

const argv = require('yargs')
    .option(
        'n', {
        alias: 'nombre',
        demandOption: false, // Para poder generar el informe sin necesidad de especificar un nombre.
        describe: 'Nombre completo del alumno.',
        type: 'string'
    }).option(
        'c', {
        alias: 'calificacion',
        demandOption:false,
        describe: 'Nota a asignar al alumno',
        type: 'number'
    }).option(
        'p', {
            alias: 'ponfalta',
            demandOption:false,
            describe: 'Añade una falta al almno en la fecha especificada.',
            type: 'string'
    }).option(
        'q', {
            alias: 'quitafalta',
            demandOption:false,
            describe: 'Quita una falta al almno en la fecha especificada.',
            type: 'string'
    }).option(
        'i', {
            alias: 'informe',
            // default: '',
            defaultDescription: "./data/iforme_DD_MM_AAAA.txt",
            describe: "Generar informe en el directorio actual.",
            type: "string"
    })
    .option(
        'printReport', {
            demandOption: false,
            describe: "Muestra la informacion de un alumno",
            type: 'boolean'
    })
    .check((argv, options) => {
        // console.log(options)
        if(typeof(argv.c) != "undefined" && isNaN(argv.c)){
            throw new Error("El operador ha de ser un número.");
        }
        // Si se usa algun de las opciones para modificar los datos de un alumno este se ha de proveer.
        if(typeof(argv.c) != "undefined" || typeof(argv.p) != "undefined" ||
            typeof(argv.q) != "undefined" || typeof(argv.s) != "undefined" ){
            if (typeof(argv.n) === "undefined" ){
                throw new Error("Al intentar añadir una nota o quitar/poner faltas se ha de dar un nombre usando la opción n")
            }
        }
        return true;
    })
    .argv;

    module.exports = argv;