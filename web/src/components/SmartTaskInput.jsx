import { useState } from "react";
import { parseTask } from "../api/ai";
import { createTask } from "../api/tasks";

export default function SmartTaskInput({ onTaskCreated }) {
  const [input, setInput] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleParse = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError("");

    try {
      const data = await parseTask(input);
      setParsedData(data);
    } catch (err) {
      setError("AI parsing failed");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      const newTask = await createTask(parsedData);
      setParsedData(null);
      setInput("");
      onTaskCreated(newTask); // refresh parent
    } catch (err) {
      setError("Task creation failed");
    }
  };

  return (
    <div className="bg-white border border-black rounded-lg p-5 space-y-4">
      
      <textarea
        placeholder="Type your task naturally... e.g. Submit tax report next Tuesday include Q4 revenue"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={3}
        className="w-full border border-black rounded-md px-4 py-2"
      />

      <div className="flex gap-3">
        <button
          onClick={handleParse}
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded-md"
        >
          {loading ? "✨ Processing..." : "Parse with AI"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {parsedData && (
        <div className="border border-black rounded-md p-4 space-y-2">
          <p><strong>Title:</strong> {parsedData.title}</p>
          <p>
            <strong>Due:</strong>{" "}
            {parsedData.dueDate
              ? new Date(parsedData.dueDate).toDateString()
              : "No due date"}
          </p>
          <p><strong>Notes:</strong> {parsedData.notes || "None"}</p>

          <button
            onClick={handleConfirm}
            className="mt-2 px-4 py-2 bg-black text-white rounded-md"
          >
            Confirm & Create
          </button>
        </div>
      )}
    </div>
  );
}
