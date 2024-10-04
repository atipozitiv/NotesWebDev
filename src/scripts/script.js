function NoTasks() {
    if (localStorage.length == 0) {
        document.body.insertAdjacentHTML('afterend', '<hr class="no-tasks">');
        document.body.insertAdjacentHTML('afterend', '<div class="no-tasks">No tasks</div>');
        document.body.insertAdjacentHTML('afterend', '<hr class="no-tasks">');
    }
}

window.onload = NoTasks();

function AddTask() {
    if (localStorage.length == 0) {
        const elements = document.getElementsByClassName("no-tasks");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }        
    }

    document.body.appendChild()
}

let addButtons = document.getElementsByClassName("add-button");
for (let turn = 0; turn < addButtons.length; ++turn) {
    addButtons[turn].addEventListener('click', AddTask);
}