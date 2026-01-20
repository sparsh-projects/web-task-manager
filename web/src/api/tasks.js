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

// Mark task as completed
export const completeTask = async (id) => {
  const res = await api.patch(`/tasks/${id}/complete`);
  return res.data;
};

// Mark task as incomplete
export const incompleteTask= async (id) => {
  const res = await api.patch(`/tasks/${id}/incomplete`);
  return res.data;
};

// Update a task (title, duedate, notes)
export const updateTask = async (id, data) => {
  const res = await api.patch(`/tasks/${id}`, data);
  return res.data;
};

// Delete a task
export const deleteTask = async (id) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};