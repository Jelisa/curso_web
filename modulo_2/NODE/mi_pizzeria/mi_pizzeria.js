// Regentamos un apizzeria que ofrece pizzas a gusto del consumidor.

// Por tanto necesitamos un menú para que elija:

// 1) el tipo de masa: solo puede elejir uno

// 2) los ingredientes: puede elegir cualquiera de ellos, incluso  más de uno, pero solo una vez cada uno.

// cada ingrediente debe mostrar su precio incrementado un 20% de beneficio + 25% gastos diversos, todo ello por un 4% de IVA
// (estos porcentajes no los ve el cliente) 

// Al final aparece el contenido del pedido y el precio total.

const { Masa, Condimentos } = require('./ingredientes.js')

const MENU = createMenu(Masa, Condimentos)
// console.log(process.argv.length);
calcularPrecio(process.argv.slice(2))

function calcularPrecio(ingredientes) {
    let precio = parseFloat(Masa[ingredientes[0] - 1].precio)
    console.log(precio)
    Condimentos[0].forEach((element,idx) => {console.log(element, idx)})
    ingredientes.slice(1).forEach(element => {
        // [element -1])
    });
}

function createMenu(masas, condimentos) {
    let menu = "*".repeat(10) + "Menú de la pizzeria" + "*".repeat(10)
    menu += "\nPor favor elije UNA masa mediante su identificador"
    masas.forEach((element, idx) => {
        menu += `\n\t${idx+ 1} .- ${element.tipo}`
    })
    let i = masas.length +1
    menu += "\nPor favor elije los condimentos que quieres mediante su identificador";
    for (let [key, value] of Object.entries(condimentos[0])) {
        menu += `\n\t${i++} .- ${key}`
    }
    console.log(menu)
}