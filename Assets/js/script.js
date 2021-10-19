let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let taskIdCounter = 0;


function taskFormHandler(event) {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    let taskDataObj = {
        name: taskNameInput, 
        type: taskTypeInput
    };

    createTaskEl(taskDataObj);
}

function createTaskEl(taskDataObj) {

    // Create list item
    let listItemEL = document.createElement("li");
    listItemEL.className = "task-item";

    //Create div to hold task info and add to list item
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEL.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEL);
}

formEl.addEventListener("submit", taskFormHandler);
