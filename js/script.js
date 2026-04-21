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

// ========================
// LOAD TODOS
// ========================
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
}

// ========================
// DELETE TODO
// ========================
function deleteTodo(event) {
  const todoItem = event.target.closest("li");
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
  const todoItem = event.target.closest("li");
  const todoId = Number(todoItem.dataset.id);

  todos.forEach(function (todo) {
    if (todo.id === todoId) {
      todo.completed = !todo.completed;
    }
  });

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
// EDIT TODO FUNCTION
// ========================
function editTodo(event) {
  // Find the clicked todo item using DOM traversal
  const todoItem = event.target.closest("li");
  const todoId = Number(todoItem.dataset.id);

  // Find the corresponding todo object in the state array
  const todoToEdit = todos.find(function (todo) {
    return todo.id === todoId;
  });

  // Ask user for updated text (pre-filled with current value)
  const updatedText = prompt("Edit your task:", todoToEdit.text);

  // If user cancels, stop execution
  if (updatedText === null) {
    return;
  }

  const trimmedText = updatedText.trim();

  // Prevent empty task update
  if (trimmedText === "") {
    alert("Task cannot be empty.");
    return;
  }

  // Update the todo text in state
  todoToEdit.text = trimmedText;

  // Persist changes and re-render UI
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
// UPDATE TASK COUNT
// ========================
// Update remaining task count (only uncompleted todos)
function updateTaskCount() {
  const remainingTasks = todos.filter(function (todo) {
    return todo.completed === false;
  }).length;

  if (remainingTasks === 1) {
    taskCount.textContent = "1 task left";
  } else {
    taskCount.textContent = remainingTasks + " tasks left";
  }
}

// ========================
// UPDATE CLEAR COMPLETED BUTTON
// ========================
// Enable/disable clear button based on completed tasks
function updateClearCompletedButton() {
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
}


// Format date string into readable format (e.g., Apr 21, 2026)
// Returns "No date" if empty
function formatDate(dateString) {
  if (!dateString) return "No date";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

// ========================
// GET FILTERED TODOS
// ========================
// Returns todos filtered by current UI state:
// status (all / active / completed),
// category, and search term
function getFilteredTodos() {
  let filteredTodos = todos;

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

  if (currentCategoryFilter !== "all") {
    filteredTodos = filteredTodos.filter(function (todo) {
      return todo.category === currentCategoryFilter;
    });
  }

  if (currentSearchTerm !== "") {
    filteredTodos = filteredTodos.filter(function (todo) {
      return todo.text.toLowerCase().includes(currentSearchTerm);
    });
  }

  return filteredTodos;
}

// ========================
// RENDER EMPTY STATE
// ========================
function renderEmptyState() {
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
}

// ========================
// CREATE TODO ELEMENT
// ========================
// Creates and returns a complete DOM element for a single todo item
function createTodoElement(todo) {
  const li = document.createElement("li");
  li.dataset.id = todo.id;

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("todo-content");

  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("todo-actions");

  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;

  if (todo.completed) {
    textSpan.classList.add("completed");
  }

  textSpan.addEventListener("click", toggleTodo);

  const categoryInfo = document.createElement("small");
categoryInfo.textContent = todo.category;
categoryInfo.classList.add("category");
categoryInfo.classList.add(todo.category);

  const priorityInfo = document.createElement("small");
  priorityInfo.textContent = "Priority: " + todo.priority;
  priorityInfo.classList.add("priority");
  priorityInfo.classList.add(todo.priority);

  const dueDateInfo = document.createElement("small");
  dueDateInfo.classList.add("due-date");

  dueDateInfo.textContent = "Due: " + formatDate(todo.dueDate);

  if (todo.dueDate) {
    const today = new Date();
    const due = new Date(todo.dueDate);

    // Normalize dates (remove time) to compare only by day
today.setHours(0,0,0,0);
due.setHours(0,0,0,0);

// If due date is in the past, mark as overdue
if (due < today) {
      dueDateInfo.classList.add("overdue");
    }
  }

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  editBtn.addEventListener("click", editTodo);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", deleteTodo);

  actionsDiv.appendChild(editBtn);
  actionsDiv.appendChild(deleteBtn);

  contentDiv.appendChild(textSpan);
  contentDiv.appendChild(categoryInfo);
  contentDiv.appendChild(priorityInfo);
  contentDiv.appendChild(dueDateInfo);

  li.appendChild(contentDiv);
  li.appendChild(actionsDiv);

  return li;
}

// ========================
// RENDER TODOS
// ========================
// Main render function:
// Clears UI and rebuilds todo list based on current state
function renderTodos() {
  todoList.innerHTML = "";

  updateStatusFilterButtons();
  updateTaskCount();
  updateClearCompletedButton();

  const filteredTodos = getFilteredTodos();

  if (filteredTodos.length === 0) {
    renderEmptyState();
    return;
  }

  filteredTodos.forEach(function (todo) {
    const todoElement = createTodoElement(todo);
    todoList.appendChild(todoElement);
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

todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

renderTodos();