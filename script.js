
const STORAGE_KEY = "tasks_dashboard_v1";

// Initial sample tasks
const sampleTasks = [
  { id: genId(), name: "Finish proposal", due: "2025-09-25", completed: false },
  { id: genId(), name: "Read module 3", due: "2025-09-26", completed: true },
  { id: genId(), name: "Prepare slides", due: "2025-09-27", completed: false },
  { id: genId(), name: "Refactor code", due: "", completed: false },
  { id: genId(), name: "Add README", due: "2025-09-28", completed: false },
];
let tasks = loadTasks();
let filter = "all";

const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");
const taskName = document.getElementById("taskName");
const taskDue = document.getElementById("taskDue");
const emptyState = document.getElementById("emptyState");
const filterBtns = document.querySelectorAll(".filter-btn");

render();

// Events
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

filterBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    filterBtns.forEach((b) =>
      b.classList.remove("bg-indigo-600", "text-white")
    );
    btn.classList.add("bg-indigo-600", "text-white");
    render();
  })
);
// Functions
function genId() {
  return "t_" + Math.random().toString(36).slice(2, 9);
}

function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTasks));
  return [...sampleTasks];
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function addTask() {
  const name = taskName.value.trim();
  const due = taskDue.value;
  if (!name) {
    alert("Task name cannot be empty");
    return;
  }
  const newTask = { id: genId(), name, due, completed: false };
  tasks.push(newTask);
  saveTasks();
  taskName.value = "";
  taskDue.value = "";
  render(true);
}

function render(animate = false) {
  let toRender = tasks.slice();
  if (filter === "pending") toRender = toRender.filter((t) => !t.completed);
  if (filter === "completed") toRender = toRender.filter((t) => t.completed);

  taskList.innerHTML = "";
  if (toRender.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }
  emptyState.classList.add("hidden");

  toRender.forEach((task) => {
    const li = document.createElement("li");
    li.className =
      "bg-white p-3 rounded shadow flex justify-between items-center";

    const left = document.createElement("div");
    left.className = "flex items-center gap-3";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleComplete(task.id));

    const meta = document.createElement("div");

    const title = document.createElement("div");
    title.textContent = task.name;
    title.className = "font-medium";
    if (task.completed) {
      title.classList.add("line-through", "text-gray-400");
    }

    const due = document.createElement("div");
    due.className = "text-xs text-gray-500";
    due.textContent = task.due ? `Due: ${task.due}` : "No due date";

    meta.appendChild(title);
    meta.appendChild(due);

    left.appendChild(checkbox);
    left.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "flex gap-2";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "px-2 py-1 border rounded";
    editBtn.addEventListener("click", () => editTask(task.id));

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "px-2 py-1 border rounded";
    delBtn.addEventListener("click", () => deleteTask(task.id));

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(left);
    li.appendChild(actions);

    taskList.appendChild(li);
  });
}
