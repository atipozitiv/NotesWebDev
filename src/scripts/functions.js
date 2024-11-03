function noTasks() {
    const noTaskCount = document.getElementsByClassName("no-tasks");
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
    const taskCount = localStorage.length;
    for (let turn = 0; turn < taskCount; ++turn) {
        let title = localStorage.key(turn);
        let about = localStorage.getItem(title);
        drawTasks(title, about);
    }
}

function drawTasks(title, about) {
    const taskCardMainDiv = document.createElement('div');
    taskCardMainDiv.classList.add('task-block');
    const taskCardTextBlock = document.createElement('div');
    taskCardTextBlock.classList.add('task-block-text');
    const taskCardTitle = document.createElement('p');
    taskCardTitle.classList.add('task-block-title');
    taskCardTitle.innerHTML = title;
    const taskCardAbout = document.createElement('p');
    taskCardAbout.classList.add('task-block-about');
    taskCardAbout.innerHTML = about;
    const taskCardButton = document.createElement('button');
    taskCardButton.classList.add('task-block-button');
    taskCardButton.innerHTML = "×";

    taskCardTextBlock.appendChild(taskCardTitle);
    taskCardTextBlock.appendChild(taskCardAbout);
    taskCardMainDiv.appendChild(taskCardTextBlock);
    taskCardMainDiv.appendChild(taskCardButton);
    document.body.appendChild(taskCardMainDiv);
}

function deleteSpecButtons() {
    const elements = document.getElementsByClassName("spec-buttons");
    while(elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }   
}

function closePopup() {
    const elements = document.getElementsByClassName("popup-background");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    } 
}

function createSpecButtons() {
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
    return specButtons;
}