let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let pageContentEl = document.querySelector("#page-content");
let tasksInProgressEl = document.querySelector("#tasks-in-progress");
let tasksCompletedEl = document.querySelector("#tasks-completed");
let taskIdCounter = 0;


function taskFormHandler(event) {
    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    let isEdit = formEl.hasAttribute("data-task-id");
    console.log(isEdit);
    if(isEdit) {
        let taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }else {
        let taskDataObj = {
            name: taskNameInput, 
            type: taskTypeInput
        };
        createTaskEl(taskDataObj);
    }
}

function completeEditTask(taskName, taskType, taskId) {
    console.log(taskName, taskType, taskId);
    let taskSelected = document.querySelector(".btn[data-task-id='" + taskId + "']").parentNode.parentNode;

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
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
    let taskActionsEl = createTaskActions(taskIdCounter);
    listItemEL.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEL);

    // Increase task counter for next unique id 
    taskIdCounter++;
}

function createTaskActions(taskId) {
    let actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    let editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // Create delete button
    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    let statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    let statusChoices = ["To Do", "In Progress", "Completed"];

    for(let i = 0; i < statusChoices.length; i++) {
        // create option element
        let statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
}

function taskButtonHandler(event) {
    console.log(event.target);

    let targetEl = event.target;

    if(targetEl.matches(".edit-btn")) {
        let taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }else if(targetEl.matches(".delete-btn")) {
        console.log("You clicked the delete button!");
        let taskId = targetEl.getAttribute("data-task-id");
        console.log(taskId);
        deleteTask(taskId);
    }
   
}

// edit a task
function editTask(taskId) {
    console.log("editing task #" + taskId);
    let taskSelected = document.querySelector(".btn[data-task-id='" + taskId + "']").parentNode.parentNode; //There is probably a better way to do this. 
    let taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName + " This is the task name!");

    let taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);


    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
}

// delete a task 
function deleteTask(taskId) {
    console.log(taskId);
    let taskSelected = document.querySelector("select[data-task-id='"+ taskId +"']").parentNode.parentNode;
    console.log(taskSelected);
    taskSelected.remove(); 
}


// changes tasks status
function taskStatusChangeHandler(event) {
    console.log(event.target);
    console.log(event.target.getAttribute("data-task-id"));

    // get the task item's id
    let taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    let statusValue = event.target.value.toLowerCase();

    // find the parent task item element pased on the id
    let taskSelected = document.querySelector(".btn[data-task-id='"+ taskId + "']").parentNode.parentNode;

    if(statusValue === "to do")
        tasksToDoEl.appendChild(taskSelected);
    else if(statusValue === "in progress")
        tasksInProgressEl.appendChild(taskSelected);
    else if(statusValue === "completed")
        tasksCompletedEl.appendChild(taskSelected);
}

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);