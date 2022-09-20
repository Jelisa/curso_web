const opcionsMenu = document.querySelectorAll('.opcionesMenu');
opcionsMenu.forEach((item, index) => {
    if (index % 2 == 0) {
        item.style.background = "#f2f2f2";
    }
})

const main = document.querySelector('main');
// console.log(main);

main.addEventListener(
    'click',
    (e) => {
        console.log(e.target.id);
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
                if (e.target.innerText == "Modo Noche"){
                    e.target.innerText = "Modo día";
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
                    e.target.innerText = "Modo Noche";
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
    switch (divToShow.getAttribute("class")){
        case "div-oculto":
            divToShow.setAttribute("class", "div-shown");
            break;
        case "div-shown":
            divToShow.setAttribute("class", "div-oculto");
            break;
    }
}

// function toogleNightMode(){

// }