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

onOpen();
noTasks();
let activeTask;

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", function() {
    const titleInput = document.getElementById("title-input");
    let titleInputValue = titleInput.value;
    const aboutInput = document.getElementById("about-input");
    let aboutInputValue = aboutInput.value;

    if(!((titleInputValue.length == 0) && (aboutInputValue.length == 0))) {
        localStorage.setItem(titleInputValue, aboutInputValue);
        titleInput.value = "";
        aboutInput.value = "";
        drawTasks(titleInputValue, aboutInputValue);
    }
    noTasks();
}); 

document.body.addEventListener('click', function(event) {
    if (event.target.classList == "task-block-text") {
        if (activeTask == event.target) {
            deleteSpecButtons();
            activeTask = null;
        } else {
            activeTask = event.target;
            deleteSpecButtons();
            event.target.parentNode.insertAdjacentElement('afterend', createSpecButtons());
        }
    }
    if (event.target.classList == "task-block") {
        if (activeTask == event.target.getElementsByClassName("task-block-text")[0]) {
            deleteSpecButtons();
            activeTask = null;
        } else {
            activeTask = event.target.getElementsByClassName("task-block-text")[0];
            deleteSpecButtons();
            event.target.insertAdjacentElement('afterend', createSpecButtons());
        }
    }
    if ((event.target.classList == "task-block-title") || (event.target.classList == "task-block-about")) {
        if (activeTask == event.target.parentNode) {
            deleteSpecButtons();
            activeTask = null;
        } else {
            activeTask = event.target.parentNode;
            deleteSpecButtons();
            event.target.parentNode.parentNode.insertAdjacentElement('afterend', createSpecButtons());
        }
    }

    if (event.target.classList == "task-block-button") {
        const backgroundDiv = document.createElement('div');
        backgroundDiv.classList.add('popup-background');
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('delete-popup');
        const deleteText = document.createElement('p');
        deleteText.innerHTML = "Delete this task?";
        const buttonsDiv = document.createElement('div');
        const buttonYes = document.createElement('button');
        buttonYes.classList.add('delete-popup-button-yes');
        buttonYes.innerHTML = "Yes";
        const buttonNo = document.createElement('button');
        buttonNo.classList.add('delete-popup-button-no');
        buttonNo.innerHTML = "No";
        buttonsDiv.appendChild(buttonYes);
        buttonsDiv.appendChild(buttonNo);
        mainDiv.appendChild(deleteText);
        mainDiv.appendChild(buttonsDiv);
        backgroundDiv.appendChild(mainDiv);
        document.body.appendChild(backgroundDiv);

        buttonYes.addEventListener('click', function() {
            let storageKey = event.target.parentNode.getElementsByClassName("task-block-title")[0].innerHTML;
            localStorage.removeItem(storageKey);
            noTasks();
            deleteSpecButtons();
            event.target.parentNode.parentNode.removeChild(event.target.parentNode);
            closePopup(); 
        })
        buttonNo.addEventListener('click', function() {
            closePopup(); 
        })
    }

    if (event.target.classList == "share-button") {
        const backgroundDiv = document.createElement('div');
        backgroundDiv.classList.add('popup-background');
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('share-popup');
        const toCopyButton = document.createElement('button');
        toCopyButton.classList.add('to-copy-button');
        const vkButton = document.createElement('button');
        vkButton.classList.add('vk-button');
        const telegramButton = document.createElement('button');
        telegramButton.classList.add('telegram-button');
        const watsappButton = document.createElement('button');
        watsappButton.classList.add('watsapp-button')
        const facebookButton = document.createElement('button');
        facebookButton.classList.add('facebook-button');
        mainDiv.appendChild(toCopyButton);
        mainDiv.appendChild(vkButton);
        mainDiv.appendChild(telegramButton);
        mainDiv.appendChild(watsappButton);
        mainDiv.appendChild(facebookButton);
        backgroundDiv.appendChild(mainDiv);
        document.body.appendChild(backgroundDiv);

        toCopyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(activeTask.getElementsByClassName("task-block-title")[0].textContent + " \n\n" + activeTask.getElementsByClassName("task-block-about")[0].textContent);
            closePopup();
        })
        vkButton.addEventListener('click', function() {
            navigator.clipboard.writeText(activeTask.getElementsByClassName("task-block-title")[0].textContent + " \n\n" + activeTask.getElementsByClassName("task-block-about")[0].textContent);
            closePopup();
        })
        telegramButton.addEventListener('click', function() {
            navigator.clipboard.writeText(activeTask.getElementsByClassName("task-block-title")[0].textContent + " \n\n" + activeTask.getElementsByClassName("task-block-about")[0].textContent);
            closePopup();
        })
        watsappButton.addEventListener('click', function() {
            navigator.clipboard.writeText(activeTask.getElementsByClassName("task-block-title")[0].textContent + " \n\n" + activeTask.getElementsByClassName("task-block-about")[0].textContent);
            closePopup();
        })
        facebookButton.addEventListener('click', function() {
            navigator.clipboard.writeText(activeTask.getElementsByClassName("task-block-title")[0].textContent + " \n\n" + activeTask.getElementsByClassName("task-block-about")[0].textContent);
            closePopup();
        })
    }

    if (event.target.classList == "info-button") {
        console.log("info");
    }

    if (event.target.classList == "edit-button") {
        const backgroundDiv = document.createElement('div');
        backgroundDiv.classList.add('popup-background');
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('edit-popup');
        const titleEditInput = document.createElement('input');
        titleEditInput.classList.add('title-edit');
        titleEditInput.value = activeTask.getElementsByClassName("task-block-title")[0].textContent;
        const aboutEditArea = document.createElement('textarea');
        aboutEditArea.classList.add('about-edit');
        aboutEditArea.value = activeTask.getElementsByClassName("task-block-about")[0].textContent;
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('popup-edit-buttons');
        const buttonCancel = document.createElement('button');
        buttonCancel.innerHTML = "Cancel";
        const buttonSave = document.createElement('button');
        buttonSave.innerHTML = "Save";
        buttonsDiv.appendChild(buttonCancel);
        buttonsDiv.appendChild(buttonSave);
        mainDiv.appendChild(titleEditInput);
        mainDiv.appendChild(aboutEditArea);
        mainDiv.appendChild(buttonsDiv);
        backgroundDiv.appendChild(mainDiv);
        document.body.appendChild(backgroundDiv);        

        buttonSave.addEventListener('click', function() {
            const titleChangedText = titleEditInput.value;
            const aboutChangedText = aboutEditArea.value;

            activeTask.parentNode.parentNode.removeChild(activeTask.parentNode);
            deleteSpecButtons();
            let storageKey = activeTask.parentNode.getElementsByClassName("task-block-title")[0].innerHTML;
            localStorage.removeItem(storageKey);
            localStorage.setItem(titleChangedText, aboutChangedText);
            drawTasks(titleChangedText, aboutChangedText);
            closePopup(); 
        })

        buttonCancel.addEventListener('click', function() {
            closePopup();
            deleteSpecButtons();
        })
    }

    if (event.target.classList == "popup-background") {
        closePopup();
    }
})