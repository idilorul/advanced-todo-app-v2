"use strict";

// ========================
// DOM ELEMENTS
// ========================
const todoInput = document.querySelector("#todoInput");
const categorySelect = document.querySelector("#categorySelect");
const prioritySelect = document.querySelector("#prioritySelect");
const dueDateInput = document.querySelector("#dueDateInput");
const addBtn = document.querySelector("#addBtn");

const searchInput = document.querySelector("#searchInput");

const allBtn = document.querySelector("#allBtn");
const activeBtn = document.querySelector("#activeBtn");
const completedBtn = document.querySelector("#completedBtn");
const categoryFilter = document.querySelector("#categoryFilter");

const taskCount = document.querySelector("#taskCount");
const clearCompletedBtn = document.querySelector("#clearCompletedBtn");
const todoList = document.querySelector("#todoList");

// ========================
// STATE
// ========================
let currentStatusFilter = "all";
let currentCategoryFilter = "all";
let currentSearchTerm = "";

let todos = [];


const savedTodos = localStorage.getItem("todos");

if (savedTodos) {
  todos = JSON.parse(savedTodos);
}

// ========================
// SAVE TODOS
// ========================
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ========================
// ADD TODO
// ========================
function addTodo() {
  const todoText = todoInput.value.trim();
  const category = categorySelect.value;
  const priority = prioritySelect.value;
  const dueDate = dueDateInput.value;

  if (todoText === "") {
    alert("Please write a task.");
    return;
  }

  const newTodo = {
    id: Date.now(),
    text: todoText,
    completed: false,
    category: category,
    priority: priority,
    dueDate: dueDate
  };

  todos.push(newTodo);
  saveTodos();

  todoInput.value = "";
  categorySelect.value = "study";
  prioritySelect.value = "low";
  dueDateInput.value = "";

  renderTodos();

  console.log(todos);
}

// ========================
// DELETE TODO
// ========================
function deleteTodo(event) {
  const clickedButton = event.target;
  const todoItem = clickedButton.parentElement.parentElement;
  const todoId = Number(todoItem.dataset.id);

  todos = todos.filter(function (todo) {
    return todo.id !== todoId;
  });

  saveTodos();
  renderTodos();
}

// ========================
// TOGGLE TODO
// ========================
function toggleTodo(event) {
  const toggleClicked = event.target;
  const todoToggle = toggleClicked.parentElement.parentElement;
  const toggleId = Number(todoToggle.dataset.id);

  todos.forEach(function (todo) {
    if (todo.id === toggleId) {
      todo.completed = !todo.completed;
      console.log("Toggled:", todo.text, todo.completed);
    }
  });

  console.log("Current filter:", currentStatusFilter);

  saveTodos();
  renderTodos();
}

// ========================
// CLEAR COMPLETED TODOS
// ========================
function clearCompletedTodos() {
  todos = todos.filter(function (todo) {
    return todo.completed === false;
  });

  saveTodos();
  renderTodos();
}

// ========================
// UPDATE STATUS FILTER BUTTONS
// ========================
function updateStatusFilterButtons() {
  allBtn.classList.remove("active-filter");
  activeBtn.classList.remove("active-filter");
  completedBtn.classList.remove("active-filter");

  if (currentStatusFilter === "all") {
    allBtn.classList.add("active-filter");
  }
  if (currentStatusFilter === "active") {
    activeBtn.classList.add("active-filter");
  }
  if (currentStatusFilter === "completed") {
    completedBtn.classList.add("active-filter");
  }
}

// ========================
// RENDER TODOS
// ========================
function renderTodos() {
  todoList.innerHTML = "";

  updateStatusFilterButtons();

  // Count only unfinished tasks
  const remainingTasks = todos.filter(function (todo) {
    return todo.completed === false;
  }).length;

  // Show singular/plural text correctly
  if (remainingTasks === 1) {
    taskCount.textContent = "1 task left";
  } else {
    taskCount.textContent = remainingTasks + " tasks left";
  }

  const hasCompletedTodos = todos.some(function (todo) {
    return todo.completed === true;
  });

  clearCompletedBtn.disabled = !hasCompletedTodos;

  if (hasCompletedTodos) {
  clearCompletedBtn.textContent = "Clear Completed";
  clearCompletedBtn.title = "Remove all completed tasks";
} else {
  clearCompletedBtn.textContent = "No completed tasks";
  clearCompletedBtn.title = "No completed tasks to clear";
}

  // Start with the full todos array
  let filteredTodos = todos;

  // Filter by completion status
  if (currentStatusFilter === "active") {
    filteredTodos = filteredTodos.filter(function (todo) {
      return todo.completed === false;
    });
  }

  if (currentStatusFilter === "completed") {
    filteredTodos = filteredTodos.filter(function (todo) {
      return todo.completed === true;
    });
  }

  // Filter by selected category
  if (currentCategoryFilter !== "all") {
    filteredTodos = filteredTodos.filter(function (todo) {
      return todo.category === currentCategoryFilter;
    });
  }

  // Filter by search text
  if (currentSearchTerm !== "") {
    filteredTodos = filteredTodos.filter(function (todo) {
      return todo.text.toLowerCase().includes(currentSearchTerm);
    });
  }

 if (filteredTodos.length === 0) {
  const emptyMessage = document.createElement("p");
  emptyMessage.classList.add("empty-message");

  if (currentSearchTerm !== "") {
    emptyMessage.textContent = "No results found.";
  } else if (currentStatusFilter === "completed") {
    emptyMessage.textContent = "No completed tasks.";
  } else if (currentStatusFilter === "active") {
    emptyMessage.textContent = "No active tasks.";
  } else if (todos.length === 0) {
    emptyMessage.textContent = "No tasks yet. Add your first task.";
  } else {
    emptyMessage.textContent = "No tasks match your filters.";
  }

  todoList.appendChild(emptyMessage);
  return;
}

  filteredTodos.forEach(function (todo) {
    const li = document.createElement("li");
    li.dataset.id = todo.id;

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("todo-content");

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("todo-actions");

    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;

    // Add completed style if task is finished
    if (todo.completed) {
      textSpan.classList.add("completed");
    }

    // Click task text to toggle completed state
    textSpan.addEventListener("click", toggleTodo);

    const categoryInfo = document.createElement("small");
    categoryInfo.textContent = "Category: " + todo.category;
    categoryInfo.classList.add("category");

    const priorityInfo = document.createElement("small");
    priorityInfo.textContent = "Priority: " + todo.priority;
    priorityInfo.classList.add("priority");

    const dueDateInfo = document.createElement("small");
    dueDateInfo.classList.add("due-date");

    // Show fallback text if no due date exists
    if (todo.dueDate === "") {
      dueDateInfo.textContent = "Due: No date";
    } else {
      dueDateInfo.textContent = "Due: " + todo.dueDate;
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    // Delete task when button is clicked
    deleteBtn.addEventListener("click", deleteTodo);

    contentDiv.appendChild(textSpan);
    contentDiv.appendChild(categoryInfo);
    contentDiv.appendChild(priorityInfo);
    contentDiv.appendChild(dueDateInfo);

    actionsDiv.appendChild(deleteBtn);

    li.appendChild(contentDiv);
    li.appendChild(actionsDiv);

    todoList.appendChild(li);
  });
}

// ========================
// FILTER EVENTS
// ========================

// Show all tasks
allBtn.addEventListener("click", function () {
  currentStatusFilter = "all";
  renderTodos();
});

// Show only active tasks
activeBtn.addEventListener("click", function () {
  currentStatusFilter = "active";
  renderTodos();
});

// Show only completed tasks
completedBtn.addEventListener("click", function () {
  currentStatusFilter = "completed";
  renderTodos();
});

// Update category filter when selection changes
categoryFilter.addEventListener("change", function () {
  currentCategoryFilter = categoryFilter.value;
  renderTodos();
});

// Update search term live while user types
searchInput.addEventListener("input", function () {
  currentSearchTerm = searchInput.value.trim().toLowerCase();
  renderTodos();
});

clearCompletedBtn.addEventListener("click", clearCompletedTodos);

// ========================
// ADD EVENT
// ========================
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTodo();
  }
})

renderTodos();