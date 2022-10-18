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
        CondimentosIdxsDictio[idx + 1 + counter] = key;
    })
    counter += elementKeys.length // Esto es por si en algún momento hubiese más de un objeto en condimentos.
})
const ValidCondimentsIdxs = Object.keys(CondimentosIdxsDictio)

const Beneficios = 1.45 // Este número equivale al 45% extra
const IVA = 1.04 // Este número sirve para calcular el 4% extra

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(MenusTitle+MasaTitle+createMenu(Masa,'masa'), function (masa) {
    let precio = 0 // Let's set the price to Zero
    // Convert the input from text to integer in order to compare with the length 
    let masaId = parseInt(masa) - 1 
    if (!isNaN(masaId) && masaId <= Masa.length){
        precio += parseFloat(Masa[masaId].precio)
    }
    else{
        console.log("La masa seleccionada no es válida");
        rl.close()
    }
    rl.question(CondimentosTitle+createMenu(Condimentos, 'condimentos'), function (condimentosSeleccionados) {
        let condimentosAdded = [];
        condimentosSeleccionados.split(',').forEach(condimento => {
            if (ValidCondimentsIdxs.includes(condimento)){
                if (!condimentosAdded.includes(condimento)) {
                    precio += parseFloat(Condimentos[0][CondimentosIdxsDictio[condimento]])
                    condimentosAdded.push(condimento)
                }
                else{
                    console.log(`El condimento ${condimento}.-${CondimentosIdxsDictio[condimento]} ya ha sido añadido, no se añadirá otra vez.`)
                }
            }
            else{
                console.log(`El valor ${condimento} no es válido.`)
            }
        })
        console.log(pizzaCompositionString(masaId, condimentosAdded))
        precio *= Beneficios;
        precio *= IVA;
        console.log(`El precio TOTAL de tu pizza (incluyendo IVA) es: ${precio.toFixed(2)}€`);
        rl.close()
    });
});
rl.on('close', function () {
    process.exit(0);
});

function createMenu(options, type) {
    /**A function to generate the Menu.
     * @param {Array} options - An array of objects containing information
     * @param {String} type - A string to be used to determine how to navigate the objects and obtain the needed information.
     */
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

function pizzaCompositionString(masaId, condimentosidxlist){
    /** A function to create a ticket string
     * @param {Int} masaId - An integer to obtain the type of masa from the Masa object
     * @param {Array} condimentosidxlist - An array containing valid indexes to obtain the condiments names from the CondimentosIdxsDictio object.
     */
    let composicionPizza = "La pizza seleccionada tiene:\n";
    composicionPizza += `\tBase:\n\t\t- ${Masa[masaId].tipo}\n`
    composicionPizza += `\tCondimentos:`
    condimentosidxlist.forEach(element =>{
        composicionPizza += `\n\t\t- ${CondimentosIdxsDictio[element]}`
    })
    return composicionPizza;
}