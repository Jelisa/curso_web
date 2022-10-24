const argv = require('yargs')
    .option(
        'n', {
        alias: 'nombre',
        demandOption: false,
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
            defaultDescription: "./data/iforme_DD_MM_AAAA.txt",
            describe: "Generar informe en el directorio actual.",
            type: "string"
        }
    )
    .check((argv, options) => {
        // console.log(options)
        if(typeof(argv.c) != "undefined" && isNaN(argv.c)){
            throw new Error("El operador ha de ser un número.");
        }
        if(typeof(argv.c) != "undefined" || typeof(argv.p) != "undefined" || typeof(argv.q) != "undefined" ){
            if (typeof(argv.n) === "undefined" ){
                throw new Error("Al intentar añadir una nota o quitar/poner faltas se ha de dar un nombre usando la opción n")
            }
        }
        return true;
    })
    .argv;

    module.exports = argv;