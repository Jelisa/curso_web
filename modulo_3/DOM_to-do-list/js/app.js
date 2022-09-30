// Variables to keep track of the tasks generated.
let totalTasks = 0;
let tasks = [];

// Constants containing information derived from the HTML model and grouped into objects
// using the type of atribute as a property
const FORM_INFORMATION = {
    "formId": "mi-formulario",
    "inputId" : "tarea_input"
}

const BUTTONS_PROPERTIES = {
    "parentClass" : ".opciones",
    "tagName" : "span"
}

const TEMPLATE_PROPERTIES = {
    "templateId" : "task_template",
    "taskTextClass" : ".tarea_text",
    "taskContainerClass" : ".tareas"
}

// States models it stores some of the logic of the states and several properties derived from the HTML
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


function createNewTaskFromTemplate(text, state="pending") {
    /** A function to create a new task div from the template on the HTML. By default the new task is set to pending. 
     * @param {String} text contains the text of the task to create
     * @param {String} state optional parameter used to set the task state. By default is pending.
     */

    // Clone the template before starting to modify it.
    const templateClone = document.getElementById(TEMPLATE_PROPERTIES.templateId).content.cloneNode(true);
    
    // Set the new task id and text for the cloned template.
    templateClone.id = `task_${totalTasks}`;
    templateClone.querySelector(TEMPLATE_PROPERTIES.taskTextClass).textContent = text;
    
    // Modify the div properties
    let div = templateClone.querySelector(TEMPLATE_PROPERTIES.taskContainerClass);
    div.id = `task_${totalTasks}`;
    div.classList.add(STATESPROPERTIES[state].class);
    div.setAttribute("task_id", totalTasks);
    
    // Set the buttons
    let buttons = templateClone.querySelectorAll(BUTTONS_PROPERTIES.tagName);
    modifyButtons(buttons, STATESPROPERTIES[state].buttonsSymbols, STATESPROPERTIES[state].buttonsTarget);
    
    // Set the state of the task using the buttons containers.
    let opciones = templateClone.querySelector(BUTTONS_PROPERTIES.parentClass);
    opciones.setAttribute("task_id", totalTasks);
    opciones.setAttribute("state", state);
    
    // Create a new fragment and append the modified template to it
    const fragment = document.createDocumentFragment();
    fragment.appendChild(templateClone);

    // Place the fragment inside the pending tasks list at the last position.
    document.getElementById(STATESPROPERTIES[state].ID).appendChild(fragment);

    // Add the task_id to the list of tasks ever created.
    tasks.push(`task_${totalTasks}`);
}

const main = document.querySelector("main");


// Adding the functions on click via the addEventListener method.
main.addEventListener(
    "click",
    (e) => {
        let eventParentNode = e.target.parentNode; // lets save the parent Node to simplify reading the code

        // When the user clicks the task creation button.
        if (e.target.tagName == "BUTTON" && eventParentNode.id == FORM_INFORMATION.formId) {
            // Read the task information
            const formTextField = document.getElementById(FORM_INFORMATION.inputId);
            // If the field isn't empty create a new task, update the number of tasks finally clean the field.
            if (formTextField.value != "") {
                createNewTaskFromTemplate(formTextField.value);
                totalTasks++;
                formTextField.value = "";
            }
            // If the field it's empty raise an alert
            else {
                alert("Empty task");
            }
        }
        // If the user clicks one of the tasks buttons switch the task's state or delete it.
        if (e.target.tagName == "SPAN" && e.target.id.includes("boton")) {
            let taskId =  eventParentNode.getAttribute("task_id");
            let currentState = eventParentNode.getAttribute("state");
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



function modifyTask(taskId, currentState, newState) {
    /** A function to modify a Node of the DOM identified by the parameter task. 
     * In order to do the modifications needed without causing reflow of the page the node is temporary stored in a 
        DocumentFragment variable.
     * @param {String} taskId: contains the id of the element to modify
     * @param {String} currentState: contains the name of the element actual state.
     * @param {String} newState: contains the name of the state to apply.
     */

    const TEMPORARY_FRAGMENT = document.createDocumentFragment();
    const ELEMENT_TO_MODIFY = document.getElementById(taskId);

    /* The following instruction removes the element from the DOM, 
    this way we can modify it without causing reflow of the page */
    TEMPORARY_FRAGMENT.appendChild(ELEMENT_TO_MODIFY);

    // Modify the buttons container where the state of the element is stored to the new state to apply.
    const BUTTONS_CONTAINER = TEMPORARY_FRAGMENT.querySelector(BUTTONS_PROPERTIES.parentClass)
    BUTTONS_CONTAINER.setAttribute("state", newState)

    // Replace the current buttons with the buttons from the new state 
    const BUTTONS = TEMPORARY_FRAGMENT.querySelectorAll(BUTTONS_PROPERTIES.tagName);
    modifyButtons(BUTTONS, STATESPROPERTIES[newState].buttonsSymbols, STATESPROPERTIES[newState].buttonsTarget);

    // Change the class responsible of the format associated to the state 
    toogleClass(TEMPORARY_FRAGMENT.firstElementChild, STATESPROPERTIES[currentState].class, STATESPROPERTIES[newState].class)

    // Move the fragment back to the DOM in the area for the new state.
    moveTo(TEMPORARY_FRAGMENT, newState);
}

function modifyButtons(oldButtonsItterable, newButtons, newStates) {
    /**A function to iterate over the elements given by the first parameter using a forEach loop in order to modify 
     * the content and targetState attribute of the aforementioned elements.
     * @param {Iterable} oldButtonsItterable: a itterable object with the method forEach
     *                           will be looped through in order to modify the elements for the new ones
     * @param {Array} newButtons: an array like object accessible through indexes containing the new information to use.
     * @param {String} newStates: a string containing the new state to apply to the targetState attribute of each new button.
     */
    oldButtonsItterable.forEach(
        (button, idx) => {
            button.textContent = newButtons[idx]
            button.setAttribute("targetState", newStates[idx]);
            button.id = "boton_"+idx;
        }
    )
}

function moveTo(element, newState){
    /** A function to change the parent of a Node. 
     * It receives a Node (or Node-like) object and a string, and changes the node parent by using the STATESPROPERTIES
     * constant in combination with the new state provided (used as key) to select the new parent by Id and then append 
     * the node.
     * @param {Node} element: a Node or Node-like object to move to a new parent.
     * @param {String} newState: a string containing the new state to move to.
     */
    const newParent = document.getElementById(STATESPROPERTIES[newState].ID);
    newParent.appendChild(element);
}

function toogleClass(element, oldClassName, newClassName) {
    /** It should receive a Node (or Node-like) object with the oldClassName string inside the class attribute, which
     *  will be replaced by the newClassName string while maintaining all the other classes of the object.
     * Params:
     * @param {Node} element: a Node or Node-like object to which the classes should be modified.
     * @param {String} oldClassName: a string containing the old class name to modify.
     * @param {String} newState: a string containing the new class name to apply.
     */
    
    // Convert the classes attribute to a list
    let classesArray = element.classList.value.split(" ");

    // Modify the array changin the desired class for the new one
    classesArray.splice(classesArray.indexOf(oldClassName), 1, newClassName)

    // Set the element class attribute to the new string containing all the classes.
    element.setAttribute('class', classesArray.join(" "))
}
