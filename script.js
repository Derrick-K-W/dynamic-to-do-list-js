// Wait for the DOM content to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Select the "Add Task" button, task input field, and the task list
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task to the list
    function addTask() {
        // Retrieve and trim the task text
        const taskText = taskInput.value.trim();

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
        };

        // Append the remove button to the list item (li)
        li.appendChild(removeButton);

        // Append the list item to the task list (ul)
        taskList.appendChild(li);

        // Clear the task input field
        taskInput.value = "";
    }

    // Attach an event listener to the "Add Task" button to add a task on click
    addButton.addEventListener('click', addTask);

    // Attach an event listener to the task input field to add a task when pressing the "Enter" key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
