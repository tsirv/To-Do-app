
// An empty table for tasks
const tasks = [];

/*
The code below adds an event listener that runs when the HTML-document is loaded.
Then it gets a reference to the element with an id of "date-container" from the HTML-document and saves it to the "dateDisplay"-variable.
The current date is set to the variable using getCurrentDate()-function.
A current week number is set to the weekNumber-variable using getCurrentWeekNumber()-function.
Finally the week number is set as a text content to the HTML-document.
*/
document.addEventListener("DOMContentLoaded", function () {
  const dateDisplay = document.getElementById("date-container");
  dateDisplay.textContent = getCurrentDate();

  const weekNumber = getCurrentWeekNumber();
  document.getElementById(
    "week-container"
  ).textContent = `Viikko ${weekNumber}`;

  displayTasks();
});

/*
FUNCTION
Function that adds task to the tasklist. 
*/
function addTask() {
  const taskInput = document.getElementById("task-name");
  const descriptionInput = document.getElementById("task-description");
  const taskTitle = taskInput.value.trim();
  const taskDescription = descriptionInput.value.trim();

  /*
  Code below creates a task object that contains a name and a description and then adds it to the tasks table.
  Then it clears the object's values and calls displayTasks() function.
  */
  const task = {
    name: taskTitle,
    description: taskDescription,
    checked: false,
  };

  tasks.unshift(task);
  taskInput.value = "";
  descriptionInput.value = "";
  addButton.disabled = true;
  displayTasks();
}

/*
FUNCTION
Function that removes task from the tasklist.
*/
function removeTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

/*
FUNCTION
Function that returns a current date.
*/
function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1; // Months start at 0!
  let day = today.getDate();

  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;

  const formattedToday = day + "." + month + "." + year;
  return formattedToday.toLocaleString();
}

/*
FUNCTION
Function that calculates the current week number
*/
function getCurrentWeekNumber() {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setDate(currentDate.getDate() + 4 - (currentDate.getDay() || 7));
  const yearStart = new Date(currentDate.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((currentDate - yearStart) / 86400000 + 1) / 7);
  return weekNumber;
}

/*
FUNCTION
Function that displays the tasks in the tasklist. It iterates through the tasks-array,
creates HTML elements for each task, and appends them to the tasklist container.
It also hadles the checkbox change event to update the task's 
visual style when checked or unchecked. 
*/
function displayTasks() {
  const taskList = document.getElementById("task-list-item");
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const defaultMessage = document.getElementById("default-message");
    defaultMessage.style.display = "block";
  } else {
    const defaultMessage = document.getElementById("default-message");
    defaultMessage.style.display = "none";
  }

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("taskItem");

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const nameAndDescription = document.createElement("div");
    nameAndDescription.classList.add("nameAndDescription");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `task-checkbox-${index}`;
    checkbox.checked = false;
    taskContainer.appendChild(checkbox);

    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        taskContainer.style.textDecoration = "line-through";
        taskContainer.style.color = "gray";
      } else {
        taskContainer.style.textDecoration = "none";
        taskContainer.style.color = "black";
      }
    });

    const taskName = document.createElement("strong");
    taskName.textContent = task.name;
    nameAndDescription.appendChild(taskName);

    if (task.description) {
      const taskDescription = document.createElement("p");
      taskDescription.textContent = task.description;
      taskDescription.classList.add("taskDescription");
      nameAndDescription.appendChild(taskDescription);
    }

    taskContainer.appendChild(nameAndDescription);
    taskItem.appendChild(taskContainer);

    const removeButtonContainer = document.createElement("div");
    removeButtonContainer.classList.add("remove-button-container");

    const trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
  </svg>`;

    const removeButton = document.createElement("button");
    removeButton.innerHTML = trashIcon;
    removeButton.addEventListener("click", () => removeTask(index));
    removeButton.classList.add("remove-button");
    removeButtonContainer.appendChild(removeButton);

    taskItem.appendChild(removeButtonContainer);

    taskList.appendChild(taskItem);
  });
}

// Get references to HTML elements for user input and the task form.
const addButton = document.getElementById("add-button");
const taskNameInput = document.getElementById("task-name");
const taskForm = document.querySelector(".task-form");

// Disable the add-button by default.
addButton.disabled = true;

/*Add an event listener to the task name input field to enable
the add-button when there is text.
*/
taskNameInput.addEventListener("input", function () {
  if (taskNameInput.value.trim() !== "") {
    addButton.disabled = false;
  } else {
    addButton.disabled = true;
  }
});

// Add an event listener to the add-button to handle the task addition.
addButton.addEventListener("click", function (event) {
  event.preventDefault();
  addTask();
});

// // Add an event listener to the task form to prevent its default submission action.
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
});
