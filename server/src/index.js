import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";

import taskRoutes from "./routes/taskRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();

/* ───────── GLOBAL MIDDLEWARE ───────── */
app.use(helmet());              // security headers
app.use(cors());                // allow frontend requests
app.use(express.json());        // parse JSON bodies

/* ───────── HEALTH & ROOT ───────── */
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API is healthy" });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Task Manager API" });
});

/* ───────── ROUTES ───────── */
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);

/* ───────── 404 HANDLER ───────── */
app.use((req, res) => {
  console.log("⚠️ 404 Not Found:", req.originalUrl);
  res.status(404).json({ error: "Route not found" });
});

/* ───────── GLOBAL ERROR HANDLER (LAST) ───────── */
app.use(errorMiddleware);

/* ───────── SERVER + DB ───────── */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 API running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
