const opcionsMenu = document.querySelectorAll('.opcionesMenu');
opcionsMenu.forEach((item, index) => {
    if (index % 2 == 0) {
        item.style.background = "#f2f2f2";
    }
})

const main = document.querySelector('main');

// Añado el botón de modo noche al inicio del documento.
const buttonDiv = document.createElement("div");
buttonDiv.innerHTML = "<img  id='night-mode' src='img/dark-mode-toggle-icon.svg' alt=''></img>"
buttonDiv.style.backgroundColor = "lightgrey";
buttonDiv.style.width = "20%";

main.insertAdjacentElement("afterbegin", buttonDiv)

main.addEventListener(
    'click',
    (e) => {
        // console.log(e.target);
        switch (true) {
            case e.target.classList.value == "preguntas":
                if (e.target.innerText == "Mostrar respuesta"){
                    e.target.innerText = "Ocultar respuesta";
                }
                else{
                    e.target.innerText = "Mostrar respuesta";
                }
            case e.target.parentNode.classList.value == "opcionesMenu":
                toogleVisibility(e.target.id)
                break;
            case e.target.id == "night-mode":
                const body = document.querySelector("body");
                const emText = document.querySelectorAll("em");
                if (e.target.getAttribute("src").includes("dark")){
                    e.target.setAttribute("src", "img/light-mode-toggle-icon.svg")
                    // console.log(body);
                    body.style.backgroundColor = "#2a2c2e";
                    body.style.color = "#f2f2f2";
                    emText.forEach(element => element.style.color="red");
                    document.querySelectorAll('.opcionesMenu').forEach(
                        (item, index) => {
                            if (index % 2 == 0) {
                                item.style.background = "#a8a3a3";
                            }
                        }
                    )
                }
                else{
                    e.target.setAttribute("src", "img/dark-mode-toggle-icon.svg");
                    body.style.backgroundColor = "white";
                    body.style.color = "black";
                    emText.forEach(element => element.style.color="black");
                    document.querySelectorAll('.opcionesMenu').forEach(
                        (item, index)  => {
                            if (index % 2 == 0) {
                                item.style.background = "#f2f2f2";
                            }
                        }
                    )
                }
            break;
        }
    }
)

// AÑADE LAS FUNCIONES QUE NECESITES

function toogleVisibility(divId){
    let divToShow = document.getElementById(`r-${divId}`)
    let classes = divToShow.getAttribute("class").split(" ");
    if (classes.includes("div-oculto")){
        let idxToModify = classes.indexOf("div-oculto");
        classes[idxToModify] = "div-shown";
    }
    else if(classes.includes("div-shown")){
        let idxToModify = classes.indexOf("div-shown");
        classes[idxToModify] = "div-oculto";
    }
    divToShow.setAttribute("class", classes.join(" "));
}

// function toogleNightMode(){

// }