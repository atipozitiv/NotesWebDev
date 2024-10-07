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
}

function DeleteSpecButtons() {
    const elements = document.getElementsByClassName("spec-buttons");
    while(elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }   
}

function ClosePopup() {
    const elements = document.getElementsByClassName("popup-background");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    } 
}

onOpen();
NoTasks();
let activeTask;
let titleToCopy = "";
let aboutToCopy = "";

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

document.body.addEventListener('click', function(event) {
    if (event.target.classList == "task-block") {
        if (activeTask == event.target.getElementsByClassName("task-block-text")[0]) {
            DeleteSpecButtons();
            activeTask = null;
        } else {
            activeTask = event.target.getElementsByClassName("task-block-text")[0];
            titleToCopy = event.target.getElementsByClassName("task-block-text")[0].getElementsByClassName("task-block-title")[0].textContent;
            aboutToCopy = event.target.getElementsByClassName("task-block-text")[0].getElementsByClassName("task-block-about")[0].textContent;
            textToCopy = titleToCopy + " \n\n" + aboutToCopy;
            DeleteSpecButtons();

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
            event.target.insertAdjacentElement('afterend', specButtons);
        }
    }

    if ((event.target.classList == "task-block-title") || (event.target.classList == "task-block-about")) {
        if (activeTask == event.target.parentNode) {
            DeleteSpecButtons();
            activeTask = null;
        } else {
            activeTask = event.target.parentNode;
            titleToCopy = activeTask.getElementsByClassName("task-block-title")[0].textContent;
            aboutToCopy = activeTask.getElementsByClassName("task-block-about")[0].textContent;
            textToCopy = titleToCopy + " \n\n" + aboutToCopy;
            DeleteSpecButtons();

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
            event.target.parentNode.parentNode.insertAdjacentElement('afterend', specButtons);
        }
    }

    if (event.target.classList == "task-block-button") {
        let backgroundDiv = document.createElement('div');
        backgroundDiv.classList.add('popup-background');
        let mainDiv = document.createElement('div');
        mainDiv.classList.add('delete-popup');
        let deleteText = document.createElement('p');
        deleteText.innerHTML = "Delete this task?";
        let buttonsDiv = document.createElement('div');
        let buttonYes = document.createElement('button');
        buttonYes.classList.add('delete-popup-button-yes');
        buttonYes.innerHTML = "Yes";
        let buttonNo = document.createElement('button');
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
            NoTasks();
            DeleteSpecButtons();
            event.target.parentNode.parentNode.removeChild(event.target.parentNode);
            ClosePopup(); 
        })
        buttonNo.addEventListener('click', function() {
            ClosePopup(); 
        })
    }

    if (event.target.classList == "share-button") {
        let backgroundDiv = document.createElement('div');
        backgroundDiv.classList.add('popup-background');
        let mainDiv = document.createElement('div');
        mainDiv.classList.add('share-popup');
        let toCopyButton = document.createElement('button');
        toCopyButton.classList.add('to-copy-button');
        let vkButton = document.createElement('button');
        vkButton.classList.add('vk-button');
        let telegramButton = document.createElement('button');
        telegramButton.classList.add('telegram-button');
        let watsappButton = document.createElement('button');
        watsappButton.classList.add('watsapp-button')
        let facebookButton = document.createElement('button');
        facebookButton.classList.add('facebook-button');
        mainDiv.appendChild(toCopyButton);
        mainDiv.appendChild(vkButton);
        mainDiv.appendChild(telegramButton);
        mainDiv.appendChild(watsappButton);
        mainDiv.appendChild(facebookButton);
        backgroundDiv.appendChild(mainDiv);
        document.body.appendChild(backgroundDiv);

        toCopyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(textToCopy);
            ClosePopup();
        })
        vkButton.addEventListener('click', function() {
            navigator.clipboard.writeText(textToCopy);
            ClosePopup();
        })
        telegramButton.addEventListener('click', function() {
            navigator.clipboard.writeText(textToCopy);
            ClosePopup();
        })
        watsappButton.addEventListener('click', function() {
            navigator.clipboard.writeText(textToCopy);
            ClosePopup();
        })
        facebookButton.addEventListener('click', function() {
            navigator.clipboard.writeText(textToCopy);
            ClosePopup();
        })
    }

    if (event.target.classList == "info-button") {
        console.log("info");
    }

    if (event.target.classList == "edit-button") {
        let backgroundDiv = document.createElement('div');
        backgroundDiv.classList.add('popup-background');
        let mainDiv = document.createElement('div');
        mainDiv.classList.add('edit-popup');
        let titleEditInput = document.createElement('input');
        titleEditInput.classList.add('title-edit');
        titleEditInput.value = titleToCopy;
        let aboutEditArea = document.createElement('textarea');
        aboutEditArea.classList.add('about-edit');
        aboutEditArea.value = aboutToCopy;
        let buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('popup-edit-buttons');
        let buttonCancel = document.createElement('button');
        buttonCancel.innerHTML = "Cancel";
        let buttonSave = document.createElement('button');
        buttonSave.innerHTML = "Save";
        buttonsDiv.appendChild(buttonCancel);
        buttonsDiv.appendChild(buttonSave);
        mainDiv.appendChild(titleEditInput);
        mainDiv.appendChild(aboutEditArea);
        mainDiv.appendChild(buttonsDiv);
        backgroundDiv.appendChild(mainDiv);
        document.body.appendChild(backgroundDiv);        

        buttonSave.addEventListener('click', function() {
            let titleChangedText = titleEditInput.value;
            let aboutChangedText = aboutEditArea.value;

            activeTask.parentNode.parentNode.removeChild(activeTask.parentNode);
            DeleteSpecButtons();
            let storageKey = activeTask.parentNode.getElementsByClassName("task-block-title")[0].innerHTML;
            localStorage.removeItem(storageKey);
            localStorage.setItem(titleChangedText, aboutChangedText);
            drawTask(titleChangedText, aboutChangedText);
            ClosePopup(); 
        })

        buttonCancel.addEventListener('click', function() {
            ClosePopup();
            DeleteSpecButtons();
        })
    }

    if (event.target.classList == "popup-background") {
        ClosePopup();
    }
})