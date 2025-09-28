
const STORAGE_KEY = "tasks_dashboard_v1";

// Initial sample tasks
const sampleTasks = [
  { id: genId(), name: "Finish proposal", due: "2025-09-25", completed: false },
  { id: genId(), name: "Read module 3", due: "2025-09-26", completed: true },
  { id: genId(), name: "Prepare slides", due: "2025-09-27", completed: false },
  { id: genId(), name: "Refactor code", due: "", completed: false },
  { id: genId(), name: "Add README", due: "2025-09-28", completed: false },
];
