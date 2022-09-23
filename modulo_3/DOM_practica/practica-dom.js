//Añadir nombre al footer.
const footer = document.querySelector("footer");

footer.firstElementChild.innerText = "Jelisa Iglesias"

/* Primer bloque incluye ejercicios del 1 al 3 */
const lista1 = document.querySelector(".colores-1") // Seleccionar la lista a modificar

// Crear el elemento green to add
const greenElement = document.createElement("li")
greenElement.innerText = "green";

lista1.appendChild(greenElement); // añadir en la última posición el elemento verde

const coralElement = lista1.children[2]; // seleccionamos el elemento a eliminar

// Crear el elemento brown to add
const brownElement = document.createElement("li");
brownElement.innerText = "brown";

lista1.replaceChild(brownElement, coralElement); // reemplazamos el coral por el brown.



/* Resto de ejercicios hechos con un único evento general que trata cada uno de los casos */

const main = document.querySelector("main");

main.addEventListener(
    'click',
    (e) => {
        let listaId; // Una variable para guardar los Ids de las listas a actualizar
        switch (e.target.id) {
            case "button-4": //Solución al  ejercicio 4
                listaId = '.colores-2'
                // Guardo el contador en un atributo idx en el botón para poder elegir el hijo que toca cambiar.
                if (e.target.getAttribute("idx") == null || e.target.getAttribute("idx") == document.querySelector(listaId).children.length) {
                    e.target.setAttribute('idx', '1');
                    colorList(listaId, 0);
                }
                else {
                    let idx = e.target.getAttribute("idx");
                    e.target.setAttribute('idx', parseInt(idx) + 1)
                    colorList(listaId, idx)
                }
                break;
            case "button-3": //Solución al ejercicio 5
                listaId = ".colores-3";
                // for (let i = 0; i < document.querySelector(listaId).children.length; i++) {
                //     setTimeout(colorList, 500*i, listaId, i)
                // }
                let i = 0;
                let intervalo = setInterval(
                    ()=>{
                        if (i < document.querySelector(listaId).children.length){
                            colorList(listaId, i++);
                        }
                        else{
                            clearInterval(intervalo);
                        }
                    },
                    500)
                break;
            case "acepto": //Solución al ejercicio 6
                const buttonToModify = e.target.parentNode.parentNode.children[7]
                if (e.target.checked) {
                    buttonToModify.removeAttribute("disabled")
                }
                else {
                    buttonToModify.setAttribute("disabled", "disabled")
                }
                break;
            default:
                if (e.target.parentNode.parentNode.id == "imagen") {//Solución al ejercicio 7
                    const newElement = document.createElement('li');
                    newElement.innerText = e.target.getAttribute("tipo");
                    document.getElementById("frutas").append(newElement);
                }
        }
    }
);

function colorList(listSelector, idxToUse) {
    /* Una función para cambiar el color del texto de uno de los hijos del elemento seleccionado 
        usando el texto de este como color, y cambiando el color del resto a negro
        Recibe:
            **listSelector: un string conteniendo el selector del Elemento padre a seleccionar
            ** idxToUse: el índice del hijo a cambiar de color.
    */
    const listToColor = document.querySelector(listSelector).children
    listToColor[idxToUse].style.color = listToColor[idxToUse].innerText
    if (idxToUse == 0) {
        listToColor[listToColor.length - 1].style.color = "black";
    }
    else {
        listToColor[idxToUse - 1].style.color = "black";
    }
}