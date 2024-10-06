function NoTasks() {
    let noTaskCount = document.getElementsByClassName("no-tasks");
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

function onOpen() {
    let taskCount = localStorage.length;
    for (let turn = 0; turn < taskCount; ++turn) {
        let title = localStorage.key(turn);
        let about = localStorage.getItem(title);
        drawTask(title, about);
    }
}

let deleteButtons;
let tastBlocks;
onOpen();
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
        drawTask(titleInputValue, aboutInputValue);
    }
    NoTasks();
}); 

function drawTask(title, about) {
    let taskCardMainDiv = document.createElement('div');
    taskCardMainDiv.classList.add('task-block');

    let taskCardTextBlock = document.createElement('div');
    taskCardTextBlock.classList.add('task-block-text');

    let taskCardTitle = document.createElement('p');
    taskCardTitle.classList.add('task-block-title');
    taskCardTitle.innerHTML = title;

    let taskCardAbout = document.createElement('p');
    taskCardAbout.classList.add('task-block-about');
    taskCardAbout.innerHTML = about;

    let taskCardButton = document.createElement('button');
    taskCardButton.classList.add('task-block-button');
    taskCardButton.innerHTML = "×";

    taskCardTextBlock.appendChild(taskCardTitle);
    taskCardTextBlock.appendChild(taskCardAbout);
    taskCardMainDiv.appendChild(taskCardTextBlock);
    taskCardMainDiv.appendChild(taskCardButton);

    document.body.appendChild(taskCardMainDiv);
    GetDeleteButtons();
    GetTaskBlocks();
}

GetDeleteButtons();
function GetDeleteButtons() {
    deleteButtons = document.getElementsByClassName("task-block-button");
    for (let turn = 0; turn < deleteButtons.length; ++turn) {
        deleteButtons[turn].addEventListener('click', function() {
            let storageKey = this.parentNode.getElementsByClassName("task-block-title")[0].innerHTML;
            localStorage.removeItem(storageKey);
            NoTasks();
            this.parentNode.parentNode.removeChild(this.parentNode);
        })
    }
}

GetTaskBlocks();
function GetTaskBlocks() {
    tastBlocks = document.getElementsByClassName("task-block-text");
    for (let turn = 0; turn < tastBlocks.length; ++tastBlocks) {
        tastBlocks[turn].addEventListener('click', function() {
            let specButtons = document.createElement('div');
            specButtons.classList.add('spec-buttons');
            let shareButton = document.createElement('button');
            shareButton.classList.add('share-button');
            let infoButton = document.createElement('button');
            infoButton.classList.add('info-button');
            let editButton = document.createElement('button');
            editButton.classList.add('edit-button');
            specButtons.appendChild(shareButton);
            specButtons.appendChild(infoButton);
            specButtons.appendChild(editButton);
            this.parentNode.parentNode.appendChild(specButtons);
        })
    }
}