
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

