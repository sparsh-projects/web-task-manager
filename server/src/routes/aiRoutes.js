import {Router} from "express";
import { parseTaskController } from "../controllers/aiController.js"; 
import authMiddleware from "../middleware/authMiddleware.js";

const router= Router();

router.post("/parse", authMiddleware, parseTaskController);
export default router;
