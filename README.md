# Advanced Todo App

A feature-rich Todo App built with **HTML, CSS, and Vanilla JavaScript**.

This project goes beyond a basic task list by focusing on **state-driven rendering**, **clean UI behavior**, and **practical productivity features** such as filtering, search, inline editing, due dates, and local persistence.

## Features

* Add new tasks with:

  * category
  * priority
  * due date
* Mark tasks as completed
* Delete tasks
* Edit tasks inline directly in the DOM
* Filter tasks by:

  * all
  * active
  * completed
* Filter tasks by category
* Search tasks live
* Clear all completed tasks
* Show remaining active task count
* Display empty states for different filter/search conditions
* Save tasks in **localStorage**
* Highlight overdue tasks
* Show category and priority badges

## Tech Stack

* HTML
* CSS
* Vanilla JavaScript

## Key Implementation Details

### State-Driven UI

The app uses a central `todos` array as the main source of truth.
UI updates are handled through `renderTodos()`, which rebuilds the list based on current application state.

### Filtering Logic

Tasks are filtered through a dedicated `getFilteredTodos()` function using:

* status filter
* category filter
* search term

This keeps filtering logic separate from rendering logic and improves maintainability.

### Local Storage Persistence

Todos are saved in the browser using `localStorage`, allowing the app to persist data across page reloads.

### Inline Editing

The edit feature was upgraded from a prompt-based approach to an inline DOM editing experience, making the interaction more realistic and user-friendly.

### UX Improvements

The app includes several UI/UX refinements:

* active filter button states
* dynamic empty-state messages
* disabled state for the clear-completed button
* due date formatting
* overdue task highlighting
* keyboard support for add/edit actions

## What I Improved in This Project

* Refactored the app toward a more state-based architecture
* Replaced index-based logic with id-based task management
* Separated data logic from UI rendering
* Added richer task metadata (category, priority, due date)
* Improved UX with filtering, search, task count, and inline editing
* Built a more portfolio-ready version of a classic Todo App

## Why This Project Matters

This project was built as part of a deeper JavaScript learning path with a focus on writing cleaner, more scalable frontend code.

It demonstrates understanding of:

* DOM manipulation
* event handling
* array methods
* state management principles
* render cycles
* localStorage
* UI/UX thinking in small frontend applications

## Future Improvements

Possible next steps:

* drag and drop task ordering
* sorting by due date or priority
* responsive/mobile polish
* dark mode
* task completion animation

## How to Run

1. Clone the repository
2. Open the project folder
3. Run `index.html` in the browser

## Project Status

Completed core functionality and polished for portfolio presentation.
