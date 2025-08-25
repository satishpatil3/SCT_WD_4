const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const clearAllBtn = document.getElementById("clear-all");


document.addEventListener("DOMContentLoaded", loadTasks);


addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});


clearAllBtn.addEventListener("click", () => {
  localStorage.removeItem("tasks");
  taskList.innerHTML = "";
});


function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText);

  saveTask(taskText);
  taskInput.value = "";
}


function createTaskElement(taskText, completed = false) {
  const li = document.createElement("li");
  li.textContent = taskText;

  if (completed) li.classList.add("completed");

  
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTasks();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("delete-btn");
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    updateTasks();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTasks() {
  let tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => createTaskElement(task.text, task.completed));
}
