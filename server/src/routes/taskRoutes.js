import { Router } from "express";
import { getAllTasksController, createTaskController, getTaskByIdController } from "../controllers/taskController.js";

const router = Router();

// Debug log for route entry
router.use((req, res, next) => {
  console.log("🔵 Route Hit:", req.method, req.originalUrl);
  next();
});

// GET all tasks
router.get("/", getAllTasksController);

// POST create task
router.post("/", createTaskController);

// GET single task by ID
router.get("/:id", getTaskByIdController);

export default router;
