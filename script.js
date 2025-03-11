// Fortune Generator
const fortunes = [
    "True wisdom comes not from knowledge, but from understanding.",
    "Don’t hold onto things that require a tight grip.",
    "I didn’t come this far to only come this far.",
    "Vulnerability sounds like faith and looks like courage.",
    "And into the forest I go, to lose my mind and find my soul.",
    "Do it scared.",
    "Look how far you've come.",
    "Each time you break your own boundaries to ensure that someone else likes you, you like yourself a little less.",
    "Sitting in silence with you is all the noise I need.",
    "There is nothing stronger than a broken woman who has rebuilt herself.
"
];

const fortuneBox = document.getElementById('fortune-box');
const fortuneText = document.getElementById('fortune-text');

// Randomly select a fortune
function getRandomFortune() {
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    fortuneText.textContent = fortunes[randomIndex];
}

// Change font color
document.getElementById('font-color-btn').addEventListener('click', () => {
    const colors = ['#b8a9c9', '#a2d5c6', '#f4a7b9', '#6c757d'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    fortuneText.style.color = randomColor;
});

// Change background color
document.getElementById('bg-color-btn').addEventListener('click', () => {
    const colors = ['#fff', '#f8f9fa', '#f4a7b9', '#a2d5c6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    fortuneBox.style.backgroundColor = randomColor;
});

// Change border color
document.getElementById('border-color-btn').addEventListener('click', () => {
    const colors = ['#b8a9c9', '#a2d5c6', '#f4a7b9', '#6c757d'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    fortuneBox.style.borderColor = randomColor;
});

// Change font style
document.getElementById('font-style-btn').addEventListener('click', () => {
    const fonts = ['Georgia', 'Arial', 'Courier New', 'Verdana'];
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    fortuneText.style.fontFamily = randomFont;
    fortuneText.style.fontSize = `${Math.floor(Math.random() * 24) + 16}px`;
});

// Load a random fortune on page load
window.onload = getRandomFortune;

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