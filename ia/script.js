// =========================
// SELECT ELEMENTS
// =========================

const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");

const clearCompletedButton = document.getElementById("clearCompleted");

const themeToggle = document.getElementById("themeToggle");

const filterButtons = document.querySelectorAll(".filter-btn");

// =========================
// APPLICATION STATE
// =========================

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let currentFilter = "all";

// =========================
// SAVE TODOS
// =========================

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// =========================
// DISPLAY TODOS
// =========================

function renderTodos() {
  todoList.innerHTML = "";

  let filteredTodos = todos;

  // Filter tasks
  if (currentFilter === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (currentFilter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  // Show / hide empty message
  if (filteredTodos.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }

  // Create todo elements
  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");

    li.className = "todo-item";

    if (todo.completed) {
      li.classList.add("completed");
    }

    // Checkbox
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.className = "todo-checkbox";

    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => {
      toggleTodo(todo.id);
    });

    // Task text
    const text = document.createElement("span");

    text.className = "todo-text";

    text.textContent = todo.text;

    // Delete button
    const deleteButton = document.createElement("button");

    deleteButton.className = "delete-btn";

    deleteButton.type = "button";

    deleteButton.textContent = "×";

    deleteButton.setAttribute("aria-label", "Delete task");

    deleteButton.addEventListener("click", () => {
      deleteTodo(todo.id);
    });

    // Add elements to task
    li.appendChild(checkbox);

    li.appendChild(text);

    li.appendChild(deleteButton);

    todoList.appendChild(li);
  });

  updateTaskCount();
}

// =========================
// ADD TODO
// =========================

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = todoInput.value.trim();

  // Don't add empty tasks
  if (text === "") {
    todoInput.focus();

    return;
  }

  const newTodo = {
    id: Date.now(),

    text: text,

    completed: false,
  };

  todos.push(newTodo);

  saveTodos();

  renderTodos();

  // Clear input
  todoInput.value = "";

  todoInput.focus();
});

// =========================
// TOGGLE TODO
// =========================

function toggleTodo(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        completed: !todo.completed,
      };
    }

    return todo;
  });

  saveTodos();

  renderTodos();
}

// =========================
// DELETE TODO
// =========================

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);

  saveTodos();

  renderTodos();
}

// =========================
// UPDATE TASK COUNT
// =========================

function updateTaskCount() {
  const activeTasks = todos.filter((todo) => !todo.completed).length;

  if (activeTasks === 1) {
    taskCount.textContent = "1 task left";
  } else {
    taskCount.textContent = `${activeTasks} tasks left`;
  }
}

// =========================
// CLEAR COMPLETED
// =========================

clearCompletedButton.addEventListener("click", function () {
  todos = todos.filter((todo) => !todo.completed);

  saveTodos();

  renderTodos();
});

// =========================
// FILTER TASKS
// =========================

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class
    button.classList.add("active");

    // Change filter
    currentFilter = button.dataset.filter;

    renderTodos();
  });
});

// =========================
// DARK / LIGHT MODE
// =========================

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  const darkMode = document.body.classList.contains("dark");

  if (darkMode) {
    themeToggle.textContent = "☀️";

    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙";

    localStorage.setItem("theme", "light");
  }
});

// =========================
// LOAD SAVED THEME
// =========================

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");

    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
}

// =========================
// INITIALIZE APP
// =========================

loadTheme();

renderTodos();
