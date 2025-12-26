import { useEffect, useState } from "react"; 
import { useNavigate, useLocation } from "react-router-dom";
import TaskCard from "../components/TaskCard"; 
import PageWrapper from "../components/PageWrapper";
import { getTasks, createTask , completeTask } from "../api/tasks";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";


export default function Tasks() {
  const navigate = useNavigate();
  const location = useLocation();   // receive navigation state
  const [tasks, setTasks] = useState([]);  // state to hold tasks sent from API
  const [newTitle, setNewTitle] = useState(""); // state for new task title

  useEffect(() => {
    loadTasks();
  }, []); // empty dependency array, this runs once on mount

  async function loadTasks() {
  try {
    const data = await getTasks();
    setTasks(data);
  } catch (err) {
    console.error("Failed to load tasks", err);
  }
  }


  // Function to handle opening task details
  const handleOpenTask = (id) => {
    navigate(`/tasks/${id}`);
  };

  // function to handle creating a new task
  const handleCreateTask= async()=>{
    if(!newTitle.trim()) return; //dont create if title is empty
    await createTask({ title: newTitle });
    setNewTitle(""); // clear input
    loadTasks(); // refresh from backend instead of local update
  }

  // function to handle completing a task
  async function handleCompleteTask(id) {
  await completeTask(id);
  loadTasks(); // refresh list
}
  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Tasks Page</h1>

      {/* Display success message when redirected after login */}
      {location.state?.message && (
        <p className="text-yellow-600 font-medium mb-4 text-center">
          {location.state.message}
        </p>
      )}

      {/* 🔹 New Task Input */}
      <div className="flex mb-6">
        <InputField
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task title"
        />  
        <PrimaryButton onClick={handleCreateTask}> Add</PrimaryButton>
      </div>  


       {/* 🔹 ACTIVE TASKS */}
      <h2 className="text-2xl font-semibold mb-4">
        Active Tasks
      </h2>

      {tasks.filter(task => !task.completed).map((task)=>(
        <TaskCard 
            key={task._id} 
            title={task.title}
            dueDate={task.dueDate}
            isOverdue={task.isOverdue}
            remainingDays={task.remainingDays}
            onClick={()=>handleOpenTask(task._id)}
            onComplete={() => handleCompleteTask(task._id)}
        />    
      ))}

      {/* 🔹 COMPLETED TASKS */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Completed Tasks
      </h2>

      {tasks
        .filter(task => task.completed) // only completed
        .map(task => (
          <TaskCard
            key={task._id}
            title={task.title}
            completedAt={task.completedAt} // 🔹 from DB
            onClick={() => handleOpenTask(task._id)}
          />
        ))}
    </PageWrapper>
  );
}
