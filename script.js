const taskForm = document.getElementById("task-form");
const taskCards = document.getElementById("task-cards");
const doneCards = document.getElementById("done-cards");

let tasks = [];

// Function to create a new task card
function createTaskCard(task, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  const taskName = document.createElement("h3");
  taskName.textContent = task.name;

  const dueDate = document.createElement("p");
  dueDate.textContent = `Due Date: ${task.date || "None"}`;

  const note = document.createElement("p");
  note.textContent = `Note: ${task.note || "None"}`;

  const buttonContainer = document.createElement("div");

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
    editTask(index);
  });
  buttonContainer.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteTask(index);
  });
  buttonContainer.appendChild(deleteButton);

  const doneButton = document.createElement("button");
  doneButton.textContent = "Done";
  doneButton.addEventListener("click", () => {
    markAsDone(index);
  });
  buttonContainer.appendChild(doneButton);

  card.appendChild(taskName);
  card.appendChild(dueDate);
  card.appendChild(note);
  card.appendChild(buttonContainer);

  if (task.done) {
    doneCards.appendChild(card);
    editButton.style.display = "none"; // Hide the edit button
    deleteButton.style.display = "none"; // Hide the delete button
    doneButton.style.display = "none"; // Hide the done button
  } else {
    taskCards.appendChild(card);
  }
}

// Function to render all task cards
function renderTaskCards() {
  taskCards.innerHTML = "";
  doneCards.innerHTML = "";
  tasks.forEach((task, index) => {
    createTaskCard(task, index);
  });
}

// Function to add a new task
function addTask(name, date, note) {
  const newTask = {
    name,
    date,
    note,
    done: false,
  };
  tasks.push(newTask);
  renderTaskCards();
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const taskInput = document.getElementById("task");
  const dateInput = document.getElementById("date");
  const noteInput = document.getElementById("note");
  const taskName = taskInput.value.trim();
  const dueDate = dateInput.value.trim();
  const note = noteInput.value.trim();
  if (taskName) {
    addTask(taskName, dueDate, note);
    taskInput.value = "";
    dateInput.value = "";
    noteInput.value = "";
    taskInput.focus();
  }
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTaskCards();
}

// Function to mark a task as done
function markAsDone(index) {
  tasks[index].done = true;
  renderTaskCards();
}

// Function to handle link click events
function handleLinkClick(event) {
  event.preventDefault();
  const confirmation = confirm("Are you sure? Need to logout");
  if (confirmation) {
    // Logout and move to the next page
    window.location.href = event.target.href;
  }
}

// Add event listeners to each link
const links = document.querySelectorAll(".link");
links.forEach((link) => {
  link.addEventListener("click", handleLinkClick);
});

// Add event listener to form submission
taskForm.addEventListener("submit", handleFormSubmit);

// Function to edit a task
function editTask(index) {
  const task = tasks[index];
  const card = taskCards.children[index];
  const editForm = document.createElement("form");
  const taskInput = document.createElement("input");
  taskInput.type = "text";
  taskInput.value = task.name;
  taskInput.style.marginRight = "10px"; // Add some margin
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = task.date;
  dateInput.style.marginRight = "10px"; // Add some margin
  const noteInput = document.createElement("textarea");
  noteInput.value = task.note;
  noteInput.style.marginRight = "10px"; // Add some margin
  noteInput.style.width = "300px"; // Set a fixed width
  noteInput.style.height = "100px"; // Set a fixed height
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.style.marginRight = "10px"; // Add some margin
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.style.marginRight = "10px"; // Add some margin

  // Set the styles for the form
  editForm.style.display = "flex";
  editForm.style.flexDirection = "column";
  editForm.style.marginBottom = "10px";

  saveButton.addEventListener("click", () => {
    const newTaskName = taskInput.value.trim();
    const newDueDate = dateInput.value.trim();
    const newNote = noteInput.value.trim();
    if (newTaskName) {
      tasks[index].name = newTaskName;
      tasks[index].date = newDueDate;
      tasks[index].note = newNote;
      renderTaskCards();
    }
  });

  cancelButton.addEventListener("click", () => {
    renderTaskCards();
  });

  editForm.appendChild(taskInput);
  editForm.appendChild(dateInput);
  editForm.appendChild(noteInput);
  editForm.appendChild(saveButton);
  editForm.appendChild(cancelButton);
  card.innerHTML = ""; // Clear the card contents
  card.appendChild(editForm); // Append the edit form to the card

  // Update event listeners for edit and delete buttons
  const updatedEditButton = editForm.querySelector("button:nth-child(1)");
  const updatedDeleteButton = editForm.querySelector("button:nth-child(2)");

  updatedEditButton.addEventListener("click", () => {
    editTask(index);
  });

  updatedDeleteButton.addEventListener("click", () => {
    deleteTask(index);
  });
}

// Restore tasks from localStorage on page load
function restoreTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTaskCards();
  }
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add event listener to window beforeunload event to save tasks
window.addEventListener("beforeunload", saveTasks);

// Restore tasks on page load
restoreTasks();
