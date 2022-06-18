const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

let tasks;
const checkLS = () => {
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}
};

const getTasks = () => {
	checkLS();

	tasks.forEach((task) => {
		const li = document.createElement("li");
		li.className = "collection-item";
		li.appendChild(document.createTextNode(task));
		const link = document.createElement("a");
		link.className = "delete-item secondary-content";
		link.innerHTML = '<i class="fa fa-remove"></i>';
		li.appendChild(link);
		taskList.appendChild(li);
	});
};

const storeTaskInLS = (task) => {
	checkLS();

	tasks.push(task);

	localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = (e) => {
	if (taskInput.value === "") {
		alert("Add a task");
	}

	const li = document.createElement("li");
	li.className = "collection-item";
	li.appendChild(document.createTextNode(taskInput.value));
	const link = document.createElement("a");
	link.className = "delete-item secondary-content";
	link.innerHTML = '<i class="fa fa-remove"></i>';
	li.appendChild(link);
	taskList.appendChild(li);

	storeTaskInLS(taskInput.value);

	taskInput.value = "";

	e.preventDefault();
};

const removeTask = (e) => {
	if (e.target.parentElement.classList.contains("delete-item")) {
		if (confirm("Are you sure?")) {
			e.target.parentElement.parentElement.remove();

			removeTaskFromLS(e.target.parentElement.parentElement);
		}
	}
};

const removeTaskFromLS = (taskItem) => {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.forEach((task, index) => {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem("tasks", JSON.stringify(tasks));
};

const clearTasksFromLS = () => {
	localStorage.clear();
};

const clearTasks = () => {
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	clearTasksFromLS();
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
	document.addEventListener("DOMContentLoaded", getTasks);
	form.addEventListener("submit", addTask);
	taskList.addEventListener("click", removeTask);
	clearBtn.addEventListener("click", clearTasks);
	filter.addEventListener("keyup", filterTasks);
};

loadEventListeners();
