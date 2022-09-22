const listaDesordenada = document.getElementById("marcas");

// console.log(listaDesordenada)

let arrayMarcas = [];

Array.from(listaDesordenada.children).forEach(element => {
    arrayMarcas.push(element.textContent);
});

arrayMarcas.sort();
// console.log(arrayMarcas);
console.log(arrayMarcas);

// listaDesordenada.replaceChildren();

// arrayMarcas.forEach(
//     element =>{
//         let newElement = document.createElement('li');
//         newElement.textContent = element;
//         listaDesordenada.appendChild(newElement)
//     }
// );

const newList = document.createElement("ul");

arrayMarcas.forEach(elemento => {
    let li = document.createElement('li');
    li.textContent = elemento
    newList.appendChild(li)
})

document.querySelector(".primero").replaceChild(newList, listaDesordenada)
console.log('pato')
document.querySelector(".primero").appendChild(listaDesordenada)
