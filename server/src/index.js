import express from 'express'      // Main backend framework
import helmet from 'helmet'        // Security middleware
import cors from 'cors'            // Allows FE <-> BE communication

// Create Express app
const app = express()


app.use(helmet())         // Adds 12 security headers
app.use(cors())           // Allows frontend to access API
app.use(express.json())   // Allows backend to read JSON body


let tasks = [
  { id: 1, title: "Learn React" },
  { id: 2, title: "Master MERN" },
];


// Health check route
// WHY? To verify server is running correctly
app.get('/api/health', (req, res) => {
  res.json({
    status: "ok",
    time: Date.now()
  })
})


app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTask = {
    id: Date.now(),
    title,
  };
  tasks.push(newTask);  // 🟢 store new task in array
  res.status(201).json(newTask);
});

app.get("/api/tasks/:id", (req, res) => {
  const { id } = req.params; // extract id from url

  const task = tasks.find((t) => t.id == id); // search in array

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task); // return selected task
});



// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');

});


// Start server on port 5000
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`)
})
