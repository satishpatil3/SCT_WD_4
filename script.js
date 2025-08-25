const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const completedList = document.getElementById("completed-list");
const clearAllBtn = document.getElementById("clear-all");


document.addEventListener("DOMContentLoaded", loadTasks);


addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = createTaskElement(taskText, false);
  taskList.appendChild(li);

  saveTasks(); 
  taskInput.value = "";
}

function createTaskElement(taskText, isCompleted) {
  const li = document.createElement("li");
  li.className = "task-item";

  const span = document.createElement("span");
  span.textContent = taskText;
  span.className = "task-text";
  if (isCompleted) span.classList.add("completed");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = isCompleted ? "Undo" : "Complete";
  completeBtn.className = "complete-btn";
  completeBtn.addEventListener("click", function () {
    li.remove();
    if (isCompleted) {
      taskList.appendChild(createTaskElement(taskText, false));
    } else {
      completedList.appendChild(createTaskElement(taskText, true));
    }
    saveTasks(); 
  });


  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";
  editBtn.addEventListener("click", function () {
    const newTask = prompt("Edit your task:", span.textContent);
    if (newTask !== null && newTask.trim() !== "") {
      span.textContent = newTask.trim();
      saveTasks(); 
    }
  });

  
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "delete-btn";
  delBtn.addEventListener("click", function () {
    li.remove();
    saveTasks(); 
  });

  
  li.appendChild(span);
  li.appendChild(completeBtn);
  li.appendChild(editBtn);
  li.appendChild(delBtn);

  return li;
}


function saveTasks() {
  const tasks = {
    pending: [],
    completed: []
  };

  
  taskList.querySelectorAll(".task-item .task-text").forEach(task => {
    tasks.pending.push(task.textContent);
  });

  
  completedList.querySelectorAll(".task-item .task-text").forEach(task => {
    tasks.completed.push(task.textContent);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (!storedTasks) return;

  storedTasks.pending.forEach(taskText => {
    taskList.appendChild(createTaskElement(taskText, false));
  });

  storedTasks.completed.forEach(taskText => {
    completedList.appendChild(createTaskElement(taskText, true));
  });
}


clearAllBtn.addEventListener("click", function () {
  taskList.innerHTML = "";
  completedList.innerHTML = "";
  localStorage.removeItem("tasks");
});
