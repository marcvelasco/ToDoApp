let tasks = [];

// Update your app.js file
document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('taskList');

    function renderTasks() {
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="drag-handle" draggable="true">&#9776;</div>
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <div class="task-actions">
                    <button onclick="moveTaskUp(${index})">&#8593;</button>
                    <button onclick="moveTaskDown(${index})">&#8595;</button>
                </div>
                <div class="task-delete">
                    <input type="checkbox" onchange="toggleTask(${task.id})" ${task.completed ? 'checked' : ''}>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });

        // Add dragstart event listener to each list item
        document.querySelectorAll('#taskList li .drag-handle').forEach(item => {
            item.addEventListener('dragstart', handleDragStart, false);
        });
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const movedTask = tasks.splice(index, 1)[0];
            tasks.splice(index - 1, 0, movedTask);
            renderTasks();
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const movedTask = tasks.splice(index, 1)[0];
            tasks.splice(index + 1, 0, movedTask);
            renderTasks();
        }
    }

    // Function to allow dropping items
    window.allowDrop = function (e) {
        e.preventDefault();
    };

    // Function to handle dropping items and reordering tasks
    window.dropTask = function (e) {
        e.preventDefault();
        const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
        const toIndex = Array.from(taskList.children).indexOf(e.target.parentNode);

        if (isNaN(fromIndex) || isNaN(toIndex) || fromIndex === toIndex) {
            return;
        }

        // Reorder the tasks array
        const movedTask = tasks.splice(fromIndex, 1)[0];
        tasks.splice(toIndex, 0, movedTask);

        // Re-render tasks
        renderTasks();
    };

    // Call renderTasks to initialize the list
    renderTasks();
});

function handleKeyDown(event) {
    // Check if the pressed key is Enter
    if (event.key === 'Enter') {
        addTask();
    }
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        tasks.push({
            id: Date.now(),
            text: taskInput.value,
            completed: false,
        });

        renderTasks();
        taskInput.value = '';
    }
}

// Add the event listener to the input field
document.getElementById('taskInput').addEventListener('keydown', handleKeyDown);


function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        tasks.push({
            id: Date.now(),
            text: taskInput.value,
            completed: false,
        });

        renderTasks();
        taskInput.value = '';
    }
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );

    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" onchange="toggleTask(${task.id})" ${task.completed ? 'checked' : ''}>
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
    module.exports = { addTask, deleteTask, toggleTask, tasks };
}
