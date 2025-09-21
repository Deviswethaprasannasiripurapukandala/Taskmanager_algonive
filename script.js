// Select Elements
const taskTitle = document.getElementById("taskTitle");
const taskDesc = document.getElementById("taskDesc");
const taskDate = document.getElementById("taskDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskContainer = document.getElementById("taskContainer");

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks
function renderTasks() {
  taskContainer.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";
    li.innerHTML = `
      <div>
        <strong>${task.title}</strong> - ${task.desc} 
        <small>(Due: ${task.date})</small>
      </div>
      <div>
        <button onclick="toggleComplete(${index})">${task.completed ? "Undo" : "Complete"}</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    if (task.completed) li.classList.add("completed");
    taskContainer.appendChild(li);
  });
}

// Add task
addTaskBtn.addEventListener("click", () => {
  if (taskTitle.value.trim() === "") return alert("Enter a task title!");

  const newTask = {
    title: taskTitle.value,
    desc: taskDesc.value,
    date: taskDate.value,
    completed: false
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();

  taskTitle.value = "";
  taskDesc.value = "";
  taskDate.value = "";
});

// Toggle complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Initial load
renderTasks();
