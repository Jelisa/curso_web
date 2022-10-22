const argv = require('yargs')
    .option(
        'n', {
        alias: 'nombre',
        demandOption: true,
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
            default: `informe_${new Date().toLocaleDateString().replaceAll('/','_')}.txt`,
            defaultDescription: "iforme_DD_MM_AAAA.txt",
            describe: "Generar informe en el directorio actual.",
            type: "string"
        }
    )
    .check((argv, options) => {
        // console.log(options)
        if(typeof(argv.c) != "undefined" && isNaN(argv.c)){
            throw new Error("El operador ha de ser un número.");
        }
        else{
            return true;
        }
    })
    .argv;

    module.exports = argv;