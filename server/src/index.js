import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
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

// Mount Task routes
app.use("/api/tasks", taskRoutes); 

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

mongoose.connect(process.env.MONGO_URI)
        .then(() => { console.log("MongoDB connected successfully"); })
        .catch((err) => { console.error("MongoDB connection error:", err.message); 
                          process.exit(1);
        });



app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
