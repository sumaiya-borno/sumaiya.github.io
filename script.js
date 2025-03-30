// Stopwatch
let timer;
let seconds = 0;
const display = document.getElementById('stopwatch-display');

function updateDisplay() {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

document.getElementById('start-btn').addEventListener('click', () => {
    if (!timer) {
        timer = setInterval(() => {
            seconds += 3;
            if (seconds > 30) {
                clearInterval(timer);
                timer = null;
                seconds = 0;
            }
            updateDisplay();
        }, 3000);
    }
});

document.getElementById('stop-btn').addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
});

document.getElementById('reset-btn').addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    seconds = 0;
    updateDisplay();
});

// To-Do List
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoItems = document.getElementById('todo-items');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#todo-items li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${task.text}</span>
        <button>Delete</button>
    `;
    if (task.completed) li.classList.add('completed');
    li.querySelector('button').addEventListener('click', () => {
        li.remove();
        saveTasks();
    });
    li.querySelector('span').addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });
    todoItems.appendChild(li);
}

addTodoBtn.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    if (taskText) {
        addTaskToDOM({ text: taskText, completed: false });
        todoInput.value = '';
        saveTasks();
    }
});

// Load tasks on page load
window.onload = loadTasks;
