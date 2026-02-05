import { Router } from "express";
import { getDashboardStatsController } from "../controllers/dashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// Debug log for route entry
router.use((req, res, next) => {
  console.log("🔵 Route Hit:", req.method, req.originalUrl);
  next();
});

// GET dashboard stats
router.get("/", authMiddleware, getDashboardStatsController);

export default router;