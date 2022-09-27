console.log('ok');

let totalTasks = 0;
let tasks = [];

// Constants containing information derived from the HTML model.
const formId = "mi-formulario";
const buttonsParentClass = "opciones";


const STATESPROPERTIES = {
    "pending" : {"buttonsSymbols": ["🔽", "⏬", "❌"],
                "buttonsTarget" : ["ongoing", "finished", "delete"],
                "class" : "div-tarea-pendiente",
                "ID": "listaPendientes"},
    "ongoing" : {"buttonsSymbols": ["🔽", "🔼", "❌"],
                "buttonsTarget" : ["finished", "pending", "delete"],
                "class" : "div-tarea-ahora",
                "ID": "listaAhora"},
    "finished" : {"buttonsSymbols": ["🔼", "⏫", "❌"],
                "buttonsTarget" : ["ongoing", "pending", "delete"],
                "class" : "div-tarea-finalizada",
                "ID": "listaFinalizada"}
}

const templateToUseId = "task_template";

function createNewTaskFromTemplate(text, state="pending") {
    const templateClone = document.getElementById(templateToUseId).content.cloneNode(true);
    const fragment = document.createDocumentFragment();

    templateClone.id = `task_${totalTasks}`;
    templateClone.querySelector(".tarea_text").textContent = text;

    let div = templateClone.querySelector(".tareas");
    div.id = `task_${totalTasks}`;
    div.classList.add(STATESPROPERTIES[state]["class"]);
    div.setAttribute("task_id", totalTasks);

    let buttons = templateClone.querySelectorAll("span");
    modifyButtons(buttons, STATESPROPERTIES[state].buttonsSymbols, STATESPROPERTIES[state].buttonsTarget);

    let opciones = templateClone.querySelector(`.${buttonsParentClass}`);
    opciones.setAttribute("task_id", totalTasks);
    opciones.setAttribute("state", state);

    fragment.appendChild(templateClone);
    document.getElementById(STATESPROPERTIES[state].ID).appendChild(fragment);
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
                formTextField.value = "";
            }
            else {
                alert("Empty task");
            }
        }
        if (e.target.tagName == "SPAN" && e.target.id.includes("boton")) {
            let taskId =  e.target.parentNode.getAttribute("task_id");
            let currentState = e.target.parentNode.getAttribute("state");
            let targetState = e.target.getAttribute("targetState"); 
            switch (targetState) {
                case "delete":
                    document.getElementById(tasks[taskId]).remove();
                    break;
                default:
                    modifyTask(tasks[taskId], currentState, targetState);
                    break;
            }
        }
    }
)



function modifyTask(task, currentState, newState) {
    /**
     * 
     */
    const buttonsContainer = document.querySelector(`#${task}>.${buttonsParentClass}`)
    let buttons = document.querySelectorAll(`#${task}>.${buttonsParentClass}>span`);
    modifyButtons(buttons, STATESPROPERTIES[newState].buttonsSymbols, STATESPROPERTIES[newState].buttonsTarget);
    moveFromTo(document.getElementById(task), currentState, newState)
    buttonsContainer.setAttribute("state", newState)
}

function modifyButtons(oldButtonsContainer, newButtons, newStates) {
    /**
     * 
     */
    oldButtonsContainer.forEach(
        (button, idx) => {
            button.textContent = newButtons[idx]
            button.setAttribute("targetState", newStates[idx]);
            button.id = "boton_"+idx;
        }
    )
}

function moveFromTo(element, currentState, newState){
    /**
     * 
     */
    const newParent = document.getElementById(STATESPROPERTIES[newState].ID);
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
