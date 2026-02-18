import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import PageWrapper from "../components/PageWrapper";
import PrimaryButton from "../components/PrimaryButton";
import {
  getTasks,
  createTask,
  completeTask,
  incompleteTask,
  deleteTask,
} from "../api/tasks";
import api from "../api/client";

export default function Tasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  function formatDateForInput(isoDate) {
    if (!isoDate) return "";
    return isoDate.split("T")[0];
  }

  async function handleParseWithAI() {
    if (!input.trim()) return;

    try {
      setLoadingAI(true);

      const res = await api.post("/ai/parse", {
        input,
      });

      setParsedData(res.data);
    } catch (err) {
      alert("AI parsing failed");
    } finally {
      setLoadingAI(false);
    }
  }

  async function handleConfirmCreate() {
    if (!parsedData.title.trim()) {
      alert("Title cannot be empty");
      return;
    }

    await createTask(parsedData);

    setParsedData(null);
    setInput("");
    loadTasks();
  }

  function handleCancelPreview() {
    setParsedData(null);
  }

  async function handleCompleteTask(id) {
    await completeTask(id);
    loadTasks();
  }

  async function handleIncompleteTask(id) {
    await incompleteTask(id);
    loadTasks();
  }

  async function handleDeleteTask(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    await deleteTask(id);
    loadTasks();
  }

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold text-center mb-6">Tasks</h1>

      {/* SMART AI INPUT */}
      <div className="max-w-2xl mx-auto space-y-4 mb-10">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something like: Finish learning React in 15 days include hooks"
          className="w-full border rounded-lg px-4 py-3 resize-none"
          rows={3}
        />

        <PrimaryButton onClick={handleParseWithAI} disabled={loadingAI}>
          {loadingAI ? "Processing..." : "Parse with AI"}
        </PrimaryButton>
      </div>

      {/* EDITABLE PREVIEW */}
      {parsedData && (
        <div className="border rounded-xl p-6 max-w-2xl mx-auto mb-12 space-y-4">
          <h2 className="text-xl font-semibold">Preview (Editable)</h2>

          <div>
            <label className="font-semibold">Title</label>
            <input
              type="text"
              value={parsedData.title}
              onChange={(e) =>
                setParsedData({
                  ...parsedData,
                  title: e.target.value,
                })
              }
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Due Date</label>
            <input
              type="date"
              value={formatDateForInput(parsedData.dueDate)}
              onChange={(e) =>
                setParsedData({
                  ...parsedData,
                  dueDate: e.target.value
                    ? new Date(e.target.value).toISOString()
                    : null,
                })
              }
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Notes</label>
            <textarea
              value={parsedData.notes}
              onChange={(e) =>
                setParsedData({
                  ...parsedData,
                  notes: e.target.value,
                })
              }
              className="w-full border px-3 py-2 rounded mt-1"
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <PrimaryButton onClick={handleConfirmCreate}>
              Confirm & Create
            </PrimaryButton>

            <button
              onClick={handleCancelPreview}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE TASKS */}
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
            onClick={() => navigate(`/tasks/${task._id}`)}
            onComplete={() => handleCompleteTask(task._id)}
            onDelete={() => handleDeleteTask(task._id)}
          />
        ))}

      {/* COMPLETED TASKS */}
      <h2 className="text-xl font-semibold mt-10 mb-4">Completed Tasks</h2>

      {tasks
        .filter((task) => task.completed)
        .map((task) => (
          <TaskCard
            key={task._id}
            title={task.title}
            completedAt={task.completedAt}
            onClick={() => navigate(`/tasks/${task._id}`)}
            onIncomplete={() => handleIncompleteTask(task._id)}
            onDelete={() => handleDeleteTask(task._id)}
          />
        ))}
    </PageWrapper>
  );
}
