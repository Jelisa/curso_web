console.log('ok');

let totalTasks = 0;

function createNewTask(text){
    document.createElement('div')
    newElement.class = "tareas div-tarea-pendiente"
    newElement.innerHTML = `<p class="p-tarea-finalizada">
                            </p>
                            <p class="opciones" >
                                <span id='down_one_${totalTasks}'>🔽</span>
                                <span id='down_all_${totalTasks}'>⏬</span>
                                <span id='delete_${totalTasks}'>❌</span>
                            </p>`
}