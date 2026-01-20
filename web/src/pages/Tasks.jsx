import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import PageWrapper from "../components/PageWrapper";
import { getTasks, createTask, completeTask, incompleteTask, deleteTask,} from "../api/tasks";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

export default function Tasks() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes]= useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  const handleOpenTask = (id) => {
    navigate(`/tasks/${id}`);
  };

  const handleCreateTask = async () => {
    if (!newTitle.trim()) return;
    await createTask({
      title: newTitle,
      dueDate: dueDate || null, // optional
      notes: notes.trim() || "",    //optional
    });
    setNewTitle("");
    setDueDate("");
    setShowCreateForm(false);
    loadTasks();
  };

  async function handleCompleteTask(id) {
    await completeTask(id);
    loadTasks();
  }
  async function handleIncompleteTask(id) {
    await incompleteTask(id);
    loadTasks();
  }
  async function handleDeleteTask(id) {
    const confirm= window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;
    await deleteTask(id);
    loadTasks();
  }


  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold text-center mb-6">Tasks</h1>

      {location.state?.message && (
        <p className="text-yellow-600 text-center">
          {location.state.message}
        </p>
      )}
      
      {!showCreateForm && (
        <div className="flex justify-center mb-6">
          <PrimaryButton onClick={() => setShowCreateForm(true)}>
            Create Task
          </PrimaryButton>
        </div>
      )}

      {/* Create Task */}
      {showCreateForm && (
      <div className="flex flex-col gap-3 mb-6 max-w-xl mx-auto">
        <InputField
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task title"
        />

        <InputField
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          onKeyDown={(e) => e.preventDefault()}
        />

        <textarea
          value={notes}
          onChange={(e)=> setNotes(e.target.value)}
          placeholder="Add Notes (optional)"
          className="border px-3 py-2 rounded"
          rows={3}
        />

        <PrimaryButton onClick={handleCreateTask}>Add</PrimaryButton>
      </div>
      )}

      {/* Active Tasks */}
      <h2 className="text-xl font-semibold mb-4">Active Tasks</h2>

      {tasks
        .filter((task) => !task.completed)
        .map((task) => (
          <TaskCard
            key={task._id}
            title={task.title}
            dueDate={task.dueDate}
            isOverdue={task.isOverdue}
            remainingDays={task.remainingDays}
            onClick={() => handleOpenTask(task._id)}
            onComplete={() => handleCompleteTask(task._id)}
            onDelete={() => handleDeleteTask(task._id)}
          />
        ))}

      {/* Completed Tasks */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Completed Tasks</h2>

      {tasks
        .filter((task) => task.completed)
        .map((task) => (
          <TaskCard
            key={task._id}
            title={task.title}
            completedAt={task.completedAt}
            onClick={() => handleOpenTask(task._id)}
            onIncomplete={() => handleIncompleteTask(task._id)}
            onDelete={() => handleDeleteTask(task._id)}
          />
        ))}
    </PageWrapper>
  );
}
