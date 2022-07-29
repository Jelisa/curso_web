// dado este objeto:

let compositores = [
    { nombre: "John Barry", salario: "100000", ciudad: "Londres" },
    { nombre: "James Horner", salario: "90000", ciudad: "Los Angeles" },
    { nombre: "Ennio Morricone", salario: "120000", ciudad: "Roma" },
    { nombre: "Nino Rota", salario: "80000", ciudad: "Roma" },
    { nombre: "Vangelis", salario: "120000", ciudad: "Londres" },
    { nombre: "Hans Zimmer", salario: "120000", ciudad: "Nueva York" },
    { nombre: "John Williams", salario: "120000", ciudad: "Nueva York" },
    { nombre: "Max Steiner", salario: "65000", ciudad: "Nueva York" },
];

console.log(compositores);

// Hay que:

// 1) crear otro array en que los objetos aparezcan 
// con los nombres ordenados de forma descendente.

let compositoresByNameDesc = compositores.sort((a, b) => {
    if (b.nombre > a.nombre) return 1;
    if (b.nombre < a.nombre) return -1;
    // a must be equal to b
    return 0;
});

console.log(compositoresByNameDesc);

// 2) crear otro array en que los objetos aparezcan 
// con el salario de forma ascendente (de menos a mayor).

let compositoresBySalaryDesc = compositores.sort((a, b) => {
    let salarioA = parseInt(a.salario), salarioB = parseInt(b.salario)
    if (salarioB > salarioA) return 1;
    if (salarioB < salarioA) return -1;
    // a must be equal to b
    return 0;
});
console.log('a', compositoresBySalaryDesc);

// 3) Crear otro array solo con los músicos de Nueva York

let newyorkerCompositores = compositores.filter(a => a.ciudad == "Nueva York");
console.log(newyorkerCompositores);

// 4) Obtenr la suma de los salarios de los músicos de Londres
let salarioNewyorkers = newyorkerCompositores.reduce((total, compositor) => total += parseInt(compositor.salario))
console.log(salarioNewyorkers);


