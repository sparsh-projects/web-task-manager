import api from "./client";

// Get all tasks
export const getTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

// Create a task
export const createTask = async (task) => {
  const res = await api.post("/tasks", task);
  return res.data;
};

// Get single task by ID (required for TaskDetails page)
export const getTaskById = async (id) => {
  const res = await api.get(`/tasks/${id}`);
  return res.data;
};
