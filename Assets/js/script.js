let buttonEl = document.querySelector("#save-task");
let tasksToDoEl = document.querySelector("#tasks-to-do");

buttonEl.addEventListener("click", createTaskHandler);

function createTaskHandler() {
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
    console.log(listItemEl + " was added to tasks");
}