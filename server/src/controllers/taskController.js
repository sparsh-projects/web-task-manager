import asyncHandler from '../utils/asyncHandler.js';
import { getAllTasks, getTaskByIdService, createTaskService} from '../services/taskService.js';

 // Get all tasks
export const getAllTasksController= asyncHandler(async(req, res)=>{
    console.log("🟢 Controller: getAllTasksController");
    const tasks= getAllTasks();
    res.json(tasks);
});

export const getTaskByIdController= asyncHandler(async(req, res)=>{
    console.log("🟢 Controller: getTaskByIdController, Params =", req.params);
    const {id}= req.params;
    const task= getTaskByIdService(id);
    if(!task){
        res.status(404);
        throw new Error("Task not found");
    }
    res.json(task);
});

export const createTaskController= asyncHandler(async(req,res)=>{
    console.log("🟢 Controller: createTaskController, Body =", req.body);
    const {title}= req.body;
    if(!title){
        res.status(400);
        throw new Error("Title is required");
    }
    const newTask= createTaskService(title);
    res.status(201).json(newTask);  
})