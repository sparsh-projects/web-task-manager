import asyncHandler from "../utils/asyncHandler.js";
import {
  getAllTasks,
  getTaskByIdService,
  createTaskService,
  completeTaskService,
  incompleteTaskService,
} from "../services/taskService.js";

// Get all tasks
export const getAllTasksController = asyncHandler(async (req, res) => {
  const { completed } = req.query;
  console.log("🟢 Controller: getAllTasksController");


  const filter = {};
  if (completed !== undefined) {
    filter.completed = completed === "true";
  }

  const tasks = await getAllTasks(filter);
  res.json(tasks);
});

// Get task by ID
export const getTaskByIdController = asyncHandler(async (req, res) => {
  console.log(
    "🟢 Controller: getTaskByIdController, Params =",
    req.params
  );
  const { id } = req.params;
  const task = await getTaskByIdService(id);   // ✅ await
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.json(task);
});

// Create task
export const createTaskController = asyncHandler(async (req, res) => {
  console.log(
    "🟢 Controller: createTaskController, Body =",
    req.body
  );

  const { title } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }

  const newTask = await createTaskService(title);   // ✅ await
  res.status(201).json(newTask);
});


// complete task
export const completeTaskController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await completeTaskService(id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.json(task);
});


// delete task
export const incompleteTaskController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await incompleteTaskService(id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.json(task);
});



