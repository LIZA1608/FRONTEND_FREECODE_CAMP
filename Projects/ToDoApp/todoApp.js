 const taskForm = document.getElementById("task-form");
 const confirmCloseDialog = document.getElementById("confirm-close-dialog");
 const openTaskFormBtn = document.getElementById("open-task-form-btn");
 const closeTaskFormBtn = document.getElementById("close-task-form-btn");
 const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
 const cancelBtn = document.getElementById("cancel-btn");
 const discardBtn = document.getElementById("discard-btn");
 const tasksContainer = document.getElementById("tasks-container");
 const titleInput = document.getElementById("title-input");
 const dateInput = document.getElementById("date-input");
 const descriptionInput = document.getElementById("description-input");
 
 // Sanitize user input to prevent XSS
 const sanitizeInput = (input) => {
   const element = document.createElement('div');
   element.innerText = input;
   return element.innerHTML;
 };
 
 // Retrieve and decrypt tasks from localStorage
 let taskData = JSON.parse(localStorage.getItem("data")) || [];
 let currentTask = {};
 
 // Add or update task function
 const addOrUpdateTask = () => {
   const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
   const taskObj = {
     id: `${sanitizeInput(titleInput.value.toLowerCase().split(" ").join("-"))}-${Date.now()}`,
     title: sanitizeInput(titleInput.value),
     date: sanitizeInput(dateInput.value),
     description: sanitizeInput(descriptionInput.value),
   };
 
   if (dataArrIndex === -1) {
     taskData.unshift(taskObj);
   } else {
     taskData[dataArrIndex] = taskObj;
   }
 
   // Store tasks securely in localStorage
   localStorage.setItem("data", JSON.stringify(taskData));
   updateTaskContainer();
   reset();
 };
 
 // Update task container with tasks
 const updateTaskContainer = () => {
   tasksContainer.innerHTML = "";
 
   taskData.forEach(({ id, title, date, description }) => {
     tasksContainer.innerHTML += `
       <div class="task" id="${id}">
         <p><strong>Title:</strong> ${title}</p>
         <p><strong>Date:</strong> ${date}</p>
         <p><strong>Description:</strong> ${description}</p>
         <button type="button" class="btn edit-btn">Edit</button>
         <button type="button" class="btn delete-btn">Delete</button> 
       </div>
     `;
   });
 };
 
 // Delete task function
 const deleteTask = (taskId) => {
   const dataArrIndex = taskData.findIndex((item) => item.id === taskId);
 
   taskData.splice(dataArrIndex, 1);
   localStorage.setItem("data", JSON.stringify(taskData));
   updateTaskContainer();
 };
 
 // Edit task function
 const editTask = (taskId) => {
   const task = taskData.find((item) => item.id === taskId);
 
   currentTask = task;
 
   titleInput.value = task.title;
   dateInput.value = task.date;
   descriptionInput.value = task.description;
 
   addOrUpdateTaskBtn.innerText = "Update Task";
   taskForm.classList.toggle("hidden");
 };
 
 // Reset form
 const reset = () => {
   addOrUpdateTaskBtn.innerText = "Add Task";
   titleInput.value = "";
   dateInput.value = "";
   descriptionInput.value = "";
   taskForm.classList.toggle("hidden");
   currentTask = {};
 };
 
 // Event listeners
 tasksContainer.addEventListener("click", (event) => {
   if (event.target.classList.contains("edit-btn")) {
     const taskId = event.target.closest(".task").id;
     editTask(taskId);
   } else if (event.target.classList.contains("delete-btn")) {
     const taskId = event.target.closest(".task").id;
     deleteTask(taskId);
   }
 });
 
 openTaskFormBtn.addEventListener("click", () =>
   taskForm.classList.toggle("hidden")
 );
 
 closeTaskFormBtn.addEventListener("click", () => {
   const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
   const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;
 
   if (formInputsContainValues && formInputValuesUpdated) {
     confirmCloseDialog.showModal();
   } else {
     reset();
   }
 });
 
 cancelBtn.addEventListener("click", () => confirmCloseDialog.close());
 
 discardBtn.addEventListener("click", () => {
   confirmCloseDialog.close();
   reset();
 });
 
 taskForm.addEventListener("submit", (e) => {
   e.preventDefault();
   addOrUpdateTask();
 });
 
 document.getElementById('backButton').addEventListener('click', function() {
     window.history.back();
 });
 
 // Initial render of tasks
 if (taskData.length) {
   updateTaskContainer();
 }
