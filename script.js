document.getElementById("task-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form values
    const taskName = document.getElementById("task-name").value;
    const taskPriority = document.querySelector(".priority-button.active")?.textContent.toLowerCase() || "low"; // Get the priority from the selected button (default to "low")
  
    // Create a task container
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task");
  
    // Create a button for the task
    const taskButton = document.createElement("button");
    taskButton.textContent = `${taskName} - Priority: ${taskPriority.charAt(0).toUpperCase() + taskPriority.slice(1)}`;
    taskButton.classList.add("task-button");
  
    // Assign priority class based on button click
    if (taskPriority === "low") {
        taskButton.classList.add("low-priority");
    } else if (taskPriority === "medium") {
        taskButton.classList.add("medium-priority");
    } else if (taskPriority === "high") {
        taskButton.classList.add("high-priority");
    }
  
    // Add event listener to mark as completed/incomplete
    taskButton.addEventListener("click", function () {
        if (!taskButton.hasAttribute("data-completed")) {
            // Mark as completed
            taskButton.textContent = `${taskName} - Priority: ${taskPriority.charAt(0).toUpperCase() + taskPriority.slice(1)}`;
            taskButton.setAttribute("data-completed", "true"); // Mark as completed
            taskButton.classList.add("completed-task"); // Add the completed-task class
            document.getElementById("completed-tasks").appendChild(taskContainer); // Move to completed list
        } else {
            // Mark as incomplete
            taskButton.textContent = `${taskName} - Priority: ${taskPriority.charAt(0).toUpperCase() + taskPriority.slice(1)}`;
            taskButton.removeAttribute("data-completed"); // Remove the completed status
            taskButton.classList.remove("completed-task"); // Remove the completed-task class
            document.getElementById("incomplete-tasks").appendChild(taskContainer); // Move back to incomplete list
        }
    });
  
    // Add the button to the task container
    taskContainer.appendChild(taskButton);
  
    // Add the task container to the incomplete tasks list
    document.getElementById("incomplete-tasks").appendChild(taskContainer);
  
    // Clear the form
    document.getElementById("task-form").reset();
  
    // Event listener for the clear completed button
    document.getElementById("clear-completed").addEventListener("click", function () {
        const completedTasks = document.getElementById("completed-tasks");
        completedTasks.innerHTML = ""; // Clear all completed tasks
    });
});

// Priority button selection handling
document.querySelectorAll('.priority-button').forEach(button => {
    button.addEventListener('click', function () {
        // Remove 'active' class from all buttons
        document.querySelectorAll('.priority-button').forEach(b => b.classList.remove('active'));
        
        // Add 'active' class to the clicked button
        this.classList.add('active');
    });
});
