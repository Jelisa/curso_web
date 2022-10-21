// const argv = require('./config/yargs')

const argv = require('yargs')
    .option(
        'o', {
        alias: 'operador',
        demandOption: true,
        // default: '/etc/passwd',
        describe: 'base de la multiplicación',
        type: 'number'
    }).option(
        'i', {
        alias: 'idioma',
        default: 'eng',
        describe: 'idioma de la tabla de multiplicar',
        type: 'string'
    }).option(
        'c', {
            alias: 'noconsole',
            demandOption:false,
            default: false,
            describe: 'impide la salida por la consola',
            type: 'boolean'
    }).option(
        't', {
            alias: 'notxt',
            default: false,
            describe: 'impide la creación de ficheros txt',
            type: 'boolean'
    }).option(
        'd', {
            alias: 'dirtxt',
            default: "output_txt",
            describe: "Fichero donde escribir los outputs",
            type: "string"
        }
    )
    .check((argv, options) => {
        if(isNaN(argv.o)){
            throw new Error("El operador ha de ser un número.");
        }
        else{
            return true;
        }
    }).argv;

    module.exports = argv;