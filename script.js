// Wait for the DOM content to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Select the "Add Task" button, task input field, and the task list
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save to Local Storage again
    }

    // Function to add a task to the list
    function addTask(taskText, save = true) {
        // Check if the taskText is provided or retrieve from input field
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // Check if the input is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item (li) element for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a new button for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); // This ensures the use of classList.add

        // Add the onclick event to the remove button to delete the task
        removeButton.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText); // Remove from Local Storage
        };

        // Append the remove button to the list item (li)
        li.appendChild(removeButton);

        // Append the list item to the task list (ul)
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = "";

        // Save the task to Local Storage if save is true
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    // Function to save a task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText); // Remove the specific task
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Attach an event listener to the "Add Task" button to add a task on click
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Attach an event listener to the task input field to add a task when pressing the "Enter" key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks();
});
