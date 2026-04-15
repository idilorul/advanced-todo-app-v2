## Advanced Todo App (Vanilla JS)

## Latest Update

### What I implemented

* Added **delete functionality** using `dataset.id` and `Array.filter`
* Implemented **toggle completed feature** by updating todo state (`completed`)
* Connected UI interactions to state via `event.target` and DOM traversal
* Introduced conditional rendering with `.completed` class

### What I improved

* Refactored logic to clearly separate **state updates** and **UI rendering**
* Ensured all changes trigger a full `renderTodos()` cycle
* Established consistent event handling pattern across features

### Why it matters

* Reinforces **state-driven UI architecture**
* Builds foundation for advanced features like filtering and search
* Demonstrates ability to connect DOM events → state → re-render cycle
