document.addEventListener('DOMContentLoaded', function() {
    let timer = null;
    let seconds = 0;
    const display = document.getElementById('stopwatch-display');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const resetBtn = document.getElementById('reset-btn');

    function updateDisplay() {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    startBtn.addEventListener('click', () => {
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

    stopBtn.addEventListener('click', () => {
        clearInterval(timer);
        timer = null;
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(timer);
        timer = null;
        seconds = 0;
        updateDisplay();
    });

    updateDisplay();
});

document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-todo-btn');
    const todoItems = document.getElementById('todo-items');

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
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

    function addTaskToDOM(taskText, isCompleted = false) {
        const li = document.createElement('li');
        if (isCompleted) li.classList.add('completed');
        
        li.innerHTML = `
            <span>${taskText}</span>
            <button>Delete</button>
        `;
        
        li.querySelector('span').addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTasks();
        });
        
        li.querySelector('button').addEventListener('click', function() {
            li.remove();
            saveTasks();
        });
        
        todoItems.appendChild(li);
    }

    addBtn.addEventListener('click', function() {
        const taskText = todoInput.value.trim();
        if (taskText) {
            addTaskToDOM(taskText);
            todoInput.value = '';
            saveTasks();
        }
    });

    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addBtn.click();
        }
    });

    loadTasks();
});

document.addEventListener('DOMContentLoaded', function() {
    const fortunes = [
        "True wisdom comes not from knowledge, but from understanding.",
        "Don't hold onto things that require a tight grip.",
        "I didn't come this far to only come this far.",
        "Vulnerability sounds like faith and looks like courage.",
        "And into the forest I go, to lose my mind and find my soul.",
        "Do it scared.",
        "Look how far you've come.",
        "Each time you break your own boundaries to ensure that someone else likes you, you like yourself a little less.",
        "Sitting in silence with you is all the noise I need.",
        "There is nothing stronger than a broken woman who has rebuilt herself."
    ];

    const fortuneBox = document.getElementById('fortune-box');
    const fortuneText = document.getElementById('fortune-text');

    function getRandomFortune() {
        const randomIndex = Math.floor(Math.random() * fortunes.length);
        fortuneText.textContent = fortunes[randomIndex];
    }

    function changeTheme(color) {
        switch(color) {
            case 'red':
                fortuneText.style.color = '#d64550';
                fortuneBox.style.backgroundColor = '#fff5f6';
                fortuneBox.style.borderColor = '#f4a7b9';
                break;
            case 'blue':
                fortuneText.style.color = '#2c3e50';
                fortuneBox.style.backgroundColor = '#f0f9f7';
                fortuneBox.style.borderColor = '#a2d5c6';
                break;
            case 'green':
                fortuneText.style.color = '#2e5e3b';
                fortuneBox.style.backgroundColor = '#f5f9f4';
                fortuneBox.style.borderColor = '#b8d8a9';
                break;
            case 'yellow':
                fortuneText.style.color = '#5e532e';
                fortuneBox.style.backgroundColor = '#fffdf2';
                fortuneBox.style.borderColor = '#f8e58c';
                break;
        }
    }

    document.getElementById('red-btn').addEventListener('click', () => changeTheme('red'));
    document.getElementById('blue-btn').addEventListener('click', () => changeTheme('blue'));
    document.getElementById('green-btn').addEventListener('click', () => changeTheme('green'));
    document.getElementById('yellow-btn').addEventListener('click', () => changeTheme('yellow'));

    getRandomFortune();
});
