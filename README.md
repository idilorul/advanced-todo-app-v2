# Advanced Todo App

A more advanced todo application built with **Vanilla JavaScript**.

## Project Goal

The goal is to move beyond a basic todo app and build a more structured application with richer task data and better UI logic.

## Latest Update

Implemented dynamic rendering logic for todos using a centralized `renderTodos()` function.

Each todo item is now:

* Generated dynamically from the state (`todos` array)
* Structured into separate content and action sections
* Displaying task text, category, priority, and due date
* Linked to its data using a unique `data-id` attribute

This update establishes a clean separation between state and UI, making the app scalable for upcoming features like delete, edit, and filtering.


## Tech Stack

* HTML
* CSS
* JavaScript
