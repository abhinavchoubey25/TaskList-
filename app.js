//Defining UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listener
loadEventListeners();

// Load all event listener function
function loadEventListeners() {
	
  // DOMload Event
  document.addEventListener('DOMContentLoaded', getTasks);

  // Add Task
  form.addEventListener('submit', addTask);

  // Remove Task
  taskList.addEventListener('click', removeTask);

  //Clear Tasklist
  clearBtn.addEventListener('click', clearTasks);

  //Filter task
  filter.addEventListener('keyup', filterTasks);
}

// Get Task from LS
function getTasks() {
  let tasks = [];
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task) {
     // Create Element li
     let lis = document.createElement('li');

     // Add class to li
     lis.className = 'collection-item';
 
     // Add input task to li
     let liText = lis.appendChild(document.createTextNode(task));
 
     // create a
     const linkTag = document.createElement('a');
 
     // Add class to anchor
     linkTag.className = 'delete-item secondary-content';
 
     // Add fontawsome icon in li
     linkTag.innerHTML = '<i class="fa fa-remove"></i>';
 
     // Add link in li
     lis.appendChild(linkTag);
     
     // Append li to ul
     taskList.appendChild(lis);
 
  })
}

// Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Please enter to add a task');
  } else {
    // Create Element li
    let lis = document.createElement('li');

    // Add class to li
    lis.className = 'collection-item';

    // Add input task to li
    let liText = lis.appendChild(document.createTextNode(taskInput.value));

    // create a
    const linkTag = document.createElement('a');

    // Add class to anchor
    linkTag.className = 'delete-item secondary-content';

    // Add fontawsome icon in li
    linkTag.innerHTML = '<i class="fa fa-remove"></i>';

    // Add link in li
    lis.appendChild(linkTag);
    
    // Append li to ul
    taskList.appendChild(lis);

    // Local Storage Call
    storeTaskInLocalStorage(taskInput.value);

    //Clear task after submit
    taskInput.value = '';
  }
  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks = [];
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove task from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove task
function removeTaskFromLocalStorage(taskItem) {
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent == task) {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
}

// Clear Tasks
function clearTasks() {
  // Method1
  /*taskList.innerHTML = '';*/

  // Method 2
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearTaskFromLocalStorage();
}

// Clear task from local storage
function clearTaskFromLocalStorage() {
  localStorage.clear();
}

// Filter Task
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach (function(task) {
    // Text content changing to lowercase of foreach
    const item = task.firstChild.textContent.toLowerCase();

    // Matching typed input with existing tasks
    if (item.indexOf(text) != -1) {
      task.style.display = 'block';
    }
    else {
      task.style.display = 'none';
    }
  });
}