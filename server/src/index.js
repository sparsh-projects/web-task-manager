import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import taskRoutes from "./routes/taskRoutes.js";   

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API is healthy" });
});

// Mount the Task routes
app.use("/api/tasks", taskRoutes);   // ✅ ADD THIS

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Task Manager API" });
});

app.use((req, res, next) => {
  console.log("⚠️ 404 Not Found:", req.originalUrl);
  res.status(404).json({ error: "Route not found" });
});

// GLOBAL ERROR HANDLER — MUST BE LAST
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
