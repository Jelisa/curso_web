const lista = document.getElementById("lista");

const arrayMarcas = ["Seat", "Audi", "Fiat", "Ford"]

// Método 1

// arrayMarcas.forEach(
//     marca => {
//         const newLi = document.createElement("li")
//         newLi.textContent = marca;
//         newLi.classList.add("marcas");
//         lista.appendChild(newLi)
//     }
// )

// Método2

// arrayMarcas.forEach(
//     marca => {
//         lista.innerHTML += `<li class='marcas'>${marca}</li>`
//     }
// )

// Método 3 - Var más inner/outerHTML

// let listaInner = "";
// arrayMarcas.forEach(
//     marca => {
//         let temp = `<li class='marcas'>${marca}<li>`
//         listaInner += temp;
//         console.log(temp);
//     }
// )
// lista.innerHTML = listaInner;

// let listaOuter = "<ul class='ul-outer'>";
// arrayMarcas.forEach(
//     marca => {
//         listaOuter += `<li class='marcas'>${marca}<li>`;
//     }
// )
// listaOuter += "</ul>"
// lista.outerHTML = listaOuter;

// Método 4 -- FRAGMENT

// const fragment = document.createDocumentFragment();
// // const fragment2 = new DocumentFragment();
// arrayMarcas.forEach(
//     marca => {
//         const li = document.createElement('li');
//         const em = document.createElement("em");
//         em.textContent = "Nombre: ";
//         em.style.color = "green";
//         const span = document.createElement('span')
//         span.textContent = marca;
//         span.classList.add("marcas");
//         li.appendChild(em);
//         li.appendChild(span);
//         fragment.appendChild(li);
//     }
// )

// lista.appendChild(fragment)


// Método 5 -- TEMPLATE

// const template = document.getElementById("template1").content;
// const fragment = document.createDocumentFragment();

// arrayMarcas.forEach(
//     marca => {
//         template.querySelector("span").textContent = marca;
//         const tempTemplate = template.cloneNode(true);
//         fragment.appendChild(tempTemplate);
//     }
// )

// lista.appendChild(fragment)

const template = document.getElementById("template1").content;
const fragment = document.createDocumentFragment();

arrayMarcas.forEach(
    marca => {
        const tempTemplate = template.cloneNode(true);
        tempTemplate.querySelector("span").textContent = marca;
        fragment.appendChild(tempTemplate);
    }
)

lista.appendChild(fragment)

