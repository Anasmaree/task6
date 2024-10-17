let tasks = [];

// Load tasks from local storage
window.onload = () => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    displayTasks(tasks);
  }
};

// Add a new task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskDesc = taskInput.value.trim();

  if (taskDesc !== '') {
    const newTask = {
      id: Date.now(),
      description: taskDesc,
      completed: false
    };
    tasks.push(newTask);
    taskInput.value = '';
    saveTasks();
    displayTasks(tasks);
  }
}

// Display all tasks
function displayTasks(tasksToDisplay) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasksToDisplay.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = task.completed ? 'completed' : '';
    taskItem.innerHTML = `
      <span>${task.description}</span>
      <div>
        <button onclick="toggleTask(${task.id})">${task.completed ? 'Uncomplete' : 'Complete'}</button>
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

// Toggle task completion
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    displayTasks(tasks);
  }
}

// Delete a task
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  displayTasks(tasks);
}

// Edit a task description
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    const newDesc = prompt('Enter new description:', task.description);
    if (newDesc) {
      task.description = newDesc;
      saveTasks();
      displayTasks(tasks);
    }
  }
}

// Search tasks by name
function searchTasks() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredTasks = tasks.filter(task =>
    task.description.toLowerCase().includes(searchInput)
  );
  displayTasks(filteredTasks);
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
