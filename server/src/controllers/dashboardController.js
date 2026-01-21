import { getDashboardStats } from "../services/dashboardService.js";
import asyncHandler from "../utils/asyncHandler.js";

// Get dashboard stats
export const getDashboardStatsController = asyncHandler(async (req, res) => {
  const { range } = req.query;
  console.log("🟢 Controller: getDashboardStatsController, Range =", range);

  const stats = await getDashboardStats(range);
  res.json(stats);
});
