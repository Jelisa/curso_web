console.log('ok');

let totalTasks = 0;
let tasks = [];

// Constant variables that store the buttons symbols.

// const pendingId = "listaPendientes";
// const ongoignId = "listaAhora";
// const finishedId = "listaFinalizada";
const formId = "mi-formulario";
const buttonsParentClass = "opciones";


const STATESPROPERTIES = {
    "pending" : {"buton": ["🔽", "⏬", "❌"],
                "class" : "div-tarea-pendiente",
                "ID": "listaPendientes"},
    "ongoing" : {"buton": ["🔽", "🔼", "❌"],
                "class" : "div-tarea-ahora",
                "ID": "listaAhora"},
    "finished" : {"buton": ["🔼", "⏫", "❌"],
                "class" : "div-tarea-finalizada",
                "ID": "listaFinalizada"}
}

// console.log(STATESPROPERTIES["pending"]["buton"])

const pendingState = "pending";
const ongoingState = "ongoing";
const finishedState = "finished";

const templateToUseId = "task_template";

const possibleStates = ["pending", "ongoing", "finished"]

function createNewTaskFromTemplate(text) {

    const state = "pending";
    const templateClone = document.getElementById(templateToUseId).content.cloneNode(true);
    const fragment = document.createDocumentFragment();

    templateClone.id = `task_${totalTasks}`;
    templateClone.querySelector(".tarea_text").textContent = text;

    let div = templateClone.querySelector(".tareas");
    div.id = `task_${totalTasks}`;
    div.classList.add(STATESPROPERTIES[state]["class"]);
    div.setAttribute("task_id", totalTasks);

    let buttons = templateClone.querySelectorAll("span");
    buttons.forEach((button, idx) => {
        button.id = `boton_${idx}_${totalTasks}`;
        button.textContent = STATESPROPERTIES[pendingState]["buton"][idx];
        button.setAttribute("taskIdx", totalTasks);
    });

    let opciones = templateClone.querySelector(`.${buttonsParentClass}`);
    opciones.setAttribute("task_id", totalTasks);
    opciones.setAttribute("state", state);

    fragment.appendChild(templateClone);
    document.getElementById(STATESPROPERTIES[state]["ID"]).appendChild(fragment);
    tasks.push(`task_${totalTasks}`);
}

const main = document.querySelector("main");

main.addEventListener(
    "click",
    (e) => {
        let eventParentNode = e.target.parentNode;
        if (e.target.tagName == "BUTTON" && eventParentNode.id == formId) {
            const formTextField = document.getElementById("tarea");
            if (formTextField.value != "") {
                createNewTaskFromTemplate(formTextField.value);
                totalTasks++;
                formTextField.innerHTML = "";
            }
            else {
                alert("Empty task");
            }
            // console.log('here', totalTasks, tasks[totalTasks - 1])
        }
        if (e.target.tagName == "SPAN" && e.target.id.includes("boton")) {
            let button_type = e.target.id.split("_")[1];
            let task_id = e.target.id.split("_")[2];
            console.log(0, e.target.parentNode.getAttribute("state"), button_type, task_id)
            if (button_type == "2"){
                console.log('ok', tasks, task_id);
                const elementToRemove = document.getElementById(tasks[task_id])
                elementToRemove.remove();
                // console.log(elementToRemove)
                // tasks.splice(task_id, 1)
                console.log(tasks)
            }
            switch (e.target.parentNode.getAttribute("state")) {
                case pendingState:
                    switch (button_type) {
                        case "0":
                            modifyTask(tasks[task_id], e.target.parentNode.getAttribute("state"), ongoingState);
                    }
                    break;
                case ongoingState:
                    switch(button_type){
                        case "0":
                            break;
                        case "1":
                            modifyTask(tasks[task_id],e.target.parentNode.getAttribute("state"), pendingState)
                            break;
                        case "2":
                            break;
                    }
                    break;
                case finishedState:
                    break;
            }
        }
    }
)



function modifyTask(task, currentState, newState) {
    /**
     * 
     */
    // console.log(1, currentState, newState);
    let buttons = document.querySelectorAll(`#${task}>.${buttonsParentClass}>span`);
    modifyButtons(buttons, STATESPROPERTIES[newState]["buton"]);
    moveFromTo(document.getElementById(task), currentState, newState)
    document.querySelector(`#${task}>.${buttonsParentClass}`).setAttribute("state", newState)
}

function modifyButtons(oldButtonsContainer, newButtons) {
    /**
     * 
     */
    oldButtonsContainer.forEach(
        (button, idx) => {button.textContent = newButtons[idx]}
    )
}

function moveFromTo(element, currentState, newState){
    /**
     * 
     */
    console.log(12, STATESPROPERTIES[currentState]["class"], STATESPROPERTIES[newState]["class"])
    const newParent = document.getElementById(STATESPROPERTIES[newState]["ID"]);
    toogleClass(element, STATESPROPERTIES[currentState]["class"], STATESPROPERTIES[newState]["class"])
    newParent.appendChild(element);
}

function toogleClass(element, oldClassName, newClassName) {
    /**
     * 
     */
    let classesArray = element.classList.value.split(" ");
    classesArray.splice(classesArray.indexOf(oldClassName), 1, newClassName)
    element.setAttribute('class', classesArray.join(" "))
}