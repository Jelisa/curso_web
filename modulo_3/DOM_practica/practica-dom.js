//Añadir nombre al footer.
const footer = document.querySelector("footer");

footer.firstElementChild.innerText = "Jelisa Iglesias"

//Primer ejercicio del 1 al 3
const lista1 = document.querySelector(".colores-1")

const greenElement = document.createElement("li")
greenElement.innerText = "green";

lista1.appendChild(greenElement);

const coralElement = lista1.children[2];

const brownElement = document.createElement("li");
brownElement.innerText = "brown";

lista1.replaceChild(brownElement, coralElement);


const main = document.querySelector("main");

main.addEventListener(
    'click',
    (e) => {
        // console.log(e.target.parentNode.parentNode.id)
        let listaId; // Una variable para guardar los Ids de las listas a actualizar
        switch (e.target.id) {
            case "button-4":
                listaId = '.colores-2'
                if (e.target.getAttribute("idx") == null || e.target.getAttribute("idx") == document.querySelector(listaId).children.length) {
                    // e.target.removeAttribute('idx');
                    e.target.setAttribute('idx', '1');
                    colorList(listaId, 0);
                }
                else {
                    let idx = e.target.getAttribute("idx");
                    e.target.setAttribute('idx', parseInt(idx) + 1)
                    colorList(listaId, idx)
                }
                break;
            case "button-3":
                console.log('ejercicio 5')
                listaId = ".colores-3";
                console.log(document.querySelector(listaId))
                for (let i = 0; i < document.querySelector(listaId).children.length; i++) {
                    setTimeout(colorList(listaId, i), 500)
                }
                break;
            case "acepto":
                const buttonToModify = e.target.parentNode.parentNode.children[7]
                if (e.target.checked) {
                    buttonToModify.removeAttribute("disabled")
                }
                else {
                    buttonToModify.setAttribute("disabled", "disabled")
                }
                break;
            default:
                if (e.target.parentNode.parentNode.id == "imagen") {
                    // console.log('ejercicio 7')
                    const newElement = document.createElement('li');
                    newElement.innerText = e.target.getAttribute("tipo");
                    document.getElementById("frutas").append(newElement);
                }
        }
    }
);

function colorList(listSelector, idxToUse) {
    const listToColor = document.querySelector(listSelector).children
    console.log ('here', listSelector, idxToUse, listToColor)
    listToColor[idxToUse].style.color = listToColor[idxToUse].innerText
    if (idxToUse == 0) {
        listToColor[listToColor.length - 1].style.color = "black";
    }
    else {
        listToColor[idxToUse - 1].style.color = "black";
    }
}