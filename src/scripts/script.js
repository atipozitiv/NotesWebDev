function NoTasks() {
    let noTaskCount = document.getElementsByClassName("no-tasks")
    if (localStorage.length == 0) {
        if (noTaskCount.length == 0) {
            document.body.insertAdjacentHTML('afterend', '<hr class="no-tasks">');
            document.body.insertAdjacentHTML('afterend', '<div class="no-tasks">No tasks</div>');
            document.body.insertAdjacentHTML('afterend', '<hr class="no-tasks">');
        }
    } else {
        const elements = document.getElementsByClassName("no-tasks");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }   
    }
}

NoTasks();

let addButton = document.getElementById("add-button");
addButton.addEventListener("click", function() {
    let titleInput = document.getElementById("title-input");
    let titleInputValue = titleInput.value;
    let aboutInput = document.getElementById("about-input");
    let aboutInputValue = aboutInput.value;

    if(!((titleInputValue.length == 0) && (aboutInputValue.length == 0))) {
        localStorage.setItem(titleInputValue, aboutInputValue);
        titleInput.value = "";
        aboutInput.value = "";

        let taskCardMainDiv = document.createElement('div');
        taskCardMainDiv.classList.add('task-block');

        let taskCardTextBlock = document.createElement('div');
        taskCardTextBlock.classList.add('task-block-text');

        let taskCardTitle = document.createElement('p');
        taskCardTitle.classList.add('task-block-title');
        taskCardTitle.innerHTML = titleInputValue;

        let taskCardAbout = document.createElement('p');
        taskCardAbout.classList.add('task-block-about');
        taskCardAbout.innerHTML = aboutInputValue;

        let taskCardButton = document.createElement('button');
        taskCardButton.classList.add('task-block-button');
        taskCardButton.innerHTML = "×";

        taskCardTextBlock.appendChild(taskCardTitle);
        taskCardTextBlock.appendChild(taskCardAbout);
        taskCardMainDiv.appendChild(taskCardTextBlock);
        taskCardMainDiv.appendChild(taskCardButton);

        document.body.appendChild(taskCardMainDiv);
    }

    NoTasks();

    
    // drawTasks();
}); 

function drawTasks() {
    let taskCount = localStorage.length;
    for (let turn = 0; turn < taskCount; ++turn) {
        
    }
}