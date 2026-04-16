## Latest Update (Day X – Filters & Task Tracking)

### ✅ What I implemented

* Added **category-based filtering** to display tasks by selected category
* Implemented **real-time search filter** using input event
* Integrated **task counter** to show remaining (active) tasks dynamically
* Combined **multiple filters (status + category + search)** into a single render pipeline

### 🔧 What I improved

* Refactored `renderTodos()` to support **multi-layer filtering logic**
* Introduced **case-insensitive search** using `toLowerCase()`
* Used `includes()` for partial text matching instead of exact match
* Ensured all UI updates are **state-driven** (no direct DOM filtering hacks)

### 🧠 Why it matters

* The app now behaves like a real-world Todo application with **dynamic filtering**
* Strengthened understanding of:

  * `filter()` chaining
  * state vs UI separation
  * string matching (`includes`, case normalization)
* Established a scalable pattern:

  * `todos → apply filters → render`

This update marks a transition from basic CRUD to **interactive, state-driven UI behavior**.
