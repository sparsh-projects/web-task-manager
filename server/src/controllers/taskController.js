import asyncHandler from "../utils/asyncHandler.js";
import {
  getAllTasks,
  getTaskByIdService,
  createTaskService,
  completeTaskService,
  incompleteTaskService,
  updateTaskService,
  deleteTaskService,
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
  console.log("🟢 Controller: getTaskByIdController, Params =",req.params);
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
  console.log("🟢 Controller: createTaskController, Body =", req.body);

  // ✅ pass full object (title + dueDate)
  const newTask = await createTaskService(req.body);

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


// mark task as incomplete
export const incompleteTaskController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await incompleteTaskService(id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.json(task);
});

// Update Task
export const updateTaskController= asyncHandler(async(req, res)=>{
  const { id }= req.params;
  const updatedTask= await updateTaskService(id, req.body);

  if(!updatedTask){
    res.status(404);
    throw new Error("Task not found");
  }
  res.json(updatedTask)
})

//delete task
export const deleteTaskController= asyncHandler(async(req, res)=>{
  const {id}= req.params;
  const deletedTask= await deleteTaskService(id);

  if(!deletedTask){
    res.status(404);
    throw new Error("Task not found");
  }
  res.json({message: "Task deleted successfully"});
});

