// Métodos antiguos
//getElementsByClassName('nombre_de_la_clase')
//getElementsByTagName('nombre_de_la_clase')
//getElementsByClassName('nombre_de_la_clase')

const normal = document.getElementsByClassName('normal', 'especial');
console.log(normal);


const normal2 = document.querySelectorAll('.lista');
console.log(normal2);


const lista = document.querySelector('.lista');
lista.forEach(elemento =>{
    elemento.style.backgroundColor = "green";
})

console.log(lista.firstElementChild);