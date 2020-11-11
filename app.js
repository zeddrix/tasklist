const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

let li;
let tasks;

const createTaskElements = () => {
  li = document.createElement("li");
  li.className = "collection-item";
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
};

const checkLS = () => {
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
};

const addTaskInLS = (task) => {
  checkLS();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = (e) => {
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
    createTaskElements();
    li.appendChild(document.createTextNode(taskInput.value));
    taskList.appendChild(li);
    addTaskInLS(taskInput.value);
    taskInput.value = "";
    e.preventDefault();
  }
};

const removeTaskFromLS = (taskItem) => {
  checkLS();

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const removeTask = (e) => {
  if (e.target.parentElement.matches(".delete-item")) {
    if (confirm("Are you sure?")) {
      const selectedLi = e.target.parentElement.parentElement;
      selectedLi.remove();

      removeTaskFromLS(selectedLi);
    }
  }
};

const clearTasksFromLS = () => {
  localStorage.clear();
};

const clearTasks = () => {
  if (confirm("Are you sure you want to clear ALL your tasks?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLS();
  }
};

const filterTasks = (e) => {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
};

const loadEventListeners = () => {
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
  document.addEventListener("DOMContentLoaded", getTasksFromLS);
};

const getTasksFromLS = () => {
  checkLS();
  tasks.forEach((task) => {
    createTaskElements();
    li.appendChild(document.createTextNode(task));
    taskList.appendChild(li);
  });
};

loadEventListeners();
