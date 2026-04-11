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

  todoInput.value = "";
  categorySelect.value = "study";
  prioritySelect.value = "low";
  dueDateInput.value = "";

  renderTodos();

  console.log(todos);
}

// ========================
// RENDER TODOS
// ========================
function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach(function (todo) {
    const li = document.createElement("li");
     li.dataset.id = todo.id;

    const contentDiv = document.createElement("div");
   contentDiv.classList.add("todo-content");

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("todo-actions");

    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;

    const categoryInfo = document.createElement("small");
    categoryInfo.textContent = "Category: " + todo.category;
    categoryInfo.classList.add("category");

    const priorityInfo = document.createElement("small");
    priorityInfo.textContent = "Priority: " + todo.priority;
    priorityInfo.classList.add("priority");

    const dueDateInfo = document.createElement("small");
    dueDateInfo.classList.add("due-date");
    if (todo.dueDate === "") {
        dueDateInfo.textContent = "Due: No date";
    } else {
        dueDateInfo.textContent = "Due: " + todo.dueDate;
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

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

addBtn.addEventListener("click", addTodo);