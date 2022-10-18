// Regentamos un apizzeria que ofrece pizzas a gusto del consumidor.

// Por tanto necesitamos un menú para que elija:

// 1) el tipo de masa: solo puede elejir uno

// 2) los ingredientes: puede elegir cualquiera de ellos, incluso  más de uno, pero solo una vez cada uno.

// cada ingrediente debe mostrar su precio incrementado un 20% de beneficio + 25% gastos diversos, todo ello por un 4% de IVA
// (estos porcentajes no los ve el cliente) 

// Al final aparece el contenido del pedido y el precio total.

const { Masa, Condimentos } = require('./ingredientes.js')
const readline = require('readline');

const MenusTitle = "*".repeat(10) + "Menú de la pizzeria" + "*".repeat(10);
const MasaTitle = `\nPor favor elije UNA masa mediante su identificador`
const CondimentosTitle = `\nPor favor elije los condimento(s) que quieres mediante su identificador separados por comas.`
// const CondimentosTitle = `\nPor favor elije los condimento(s) que quieres mediante su identificador de uno en uno`
const CondimentosIdxsDictio = {}
let counter = 0;
Condimentos.forEach((element, idx) =>{
    let elementKeys = Object.keys(element);
    elementKeys.forEach((key, idx) => {
        CondimentosIdxsDictio[idx +1 + counter] = key;
    })
    counter += elementKeys.length
})

// console.log(CondimentosIdxsDictio)

const Beneficios = 1.45 // Este número equivale al 45% extra
const IVA = 1.04 // Este número sirve para calcular el 4% extra

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(MenusTitle+MasaTitle+createMenu(Masa,'masa'), function (masa) {
    let precio = 0
    let masaId = parseInt(masa)
    if (!isNaN(masaId) && masaId <= Masa.length){
        precio += parseFloat(Masa[masaId-1].precio)
    }
    else{
        console.log("La masa seleccionada no es válida");
        rl.close()
    }
    rl.question(CondimentosTitle+createMenu(Condimentos, 'condimentos'), function (condimentosSeleccionados) {
        let i = 0;
        let condimentosAdded = [];
        condimentosSeleccionados.split(',').forEach(elemento => {
            if (Object.keys(CondimentosIdxsDictio).includes(elemento)){
                if (!condimentosAdded.includes(elemento)) {
                    precio += parseFloat(Condimentos[0][CondimentosIdxsDictio[elemento]])
                    condimentosAdded.push(elemento)
                }
                else{
                    console.log(`El condimento ${elemento} ya ha sido añadido, no se añadirá otra vez.`)
                }
            }
        })
        // // console.log(isNaN(parseInt(condimento)))
        // rl.prompt()
        // if (isNaN(parseInt(condimento))){
        //     rl.close()
        // }
        // else{
        //     if (Object.keys(CondimentosIdxsDictio).includes(condimento)){
        //         // precio += parseFloat(Condimentos[0][condimento])
        //     }
        // }
        // for (let key of Object.keys(Condimentos[0])) {
        //     if (condimentosIdxs.includes(++i)){
        //         precio += parseFloat(Condimentos[0][key]);
        //         condimentosIdxs.splice(condimentosIdxs.indexOf(i), 1)
        //     }
        // }
        // if (condimentosIdxs.length != 0){
        //     console.log(`Los condimentos '${condimentosIdxs.join(", ")}' no son válidos o ya se han añadido una vez`)}
        precio *= Beneficios;
        precio *= IVA;
        console.log('El precio TOTAL de tu pizza (incluyendo IVA) es:', precio.toFixed(2));
        // if ()
        rl.close()
    });
    // console.log(0)
    // rl.close()
});
rl.on('close', function () {
    process.exit(0);
});

function createMenu(options, type) {
    let menu = "";
    options.forEach((element, idx) => {
        if (type == "masa"){
            menu += `\n\t${idx+ 1} .- ${element.tipo}`;
        }
        else if (type == "condimentos"){
            let i = 0;
            for (let key of Object.keys(element)) {
                menu += `\n\t${++i} .- ${key}`
            }
        }
    })
    menu += "\n";
    return menu;
}