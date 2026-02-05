import {Router} from "express";
import { registerUserController, loginUserController } from "../controllers/authController.js";
const router= Router();

// Debug log for route entry
router.use((req, res, next)=>{
    console.log("🔵 Route Hit:", req.method, req.originalUrl);
    next();
})

// POST /api/auth/register - Register new user
router.post("/register", registerUserController);

// POST /api/auth/login - Login user
router.post("/login", loginUserController);
export default router;
