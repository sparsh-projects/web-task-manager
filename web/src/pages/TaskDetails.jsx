import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { getTaskById, updateTask } from "../api/tasks";

export default function TaskDetails() {
  const { id } = useParams();

  // Backend-confirmed task (source of truth)
  const [task, setTask] = useState(null);

  // Editable copy of task (temporary user changes)
  const [draftTask, setDraftTask] = useState(null);

  // UI mode flag
  const [isEditing, setIsEditing] = useState(false);

  // Load task from backend
  useEffect(() => {
    async function loadTask() {
      const data = await getTaskById(id);
      setTask(data);
      setDraftTask(data); // create editable copy
    }
    loadTask();
  }, [id]);

  // Build PATCH payload (only changed fields)
  function getChangedFields(original, draft) {
    const changes = {};

    if (draft.title !== original.title) {
      changes.title = draft.title;
    }

    if (draft.dueDate !== original.dueDate) {
      changes.dueDate = draft.dueDate;
    }

    if (draft.notes !== original.notes) {
      changes.notes = draft.notes;
    }

    return changes;
  }

  // Save edits to backend
  async function handleSave() {
    const changes = getChangedFields(task, draftTask);

    if (Object.keys(changes).length === 0) {
      alert("No changes to save");
      return;
    }

    try {
      await updateTask(id, changes);
      const updatedTask = await getTaskById(id); 
      setTask(updatedTask);
      setDraftTask(updatedTask);
      setIsEditing(false);
    } catch (error) {
      alert(error.message || "Failed to update task");
    }
  }

  // Guard render until data exists
  if (!task || !draftTask) {
    return (
      <PageWrapper>
        <p className="text-center text-gray-500">
          Loading task details...
        </p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        Task Details
      </h1>

      <div className="bg-white shadow-md rounded-md p-6 border max-w-lg mx-auto">

        {/* Edit / Cancel / Save controls */}
        <div className="flex justify-end gap-4 mb-4">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 font-medium"
            >
              Edit
            </button>
          )}

          {isEditing && (
            <>
              <button
                onClick={() => {
                  setDraftTask(task); // revert edits
                  setIsEditing(false);
                }}
                className="text-gray-600 font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="text-green-600 font-medium"
              >
                Save
              </button>
            </>
          )}
        </div>

        {/* Title */}
        {!isEditing ? (
          <p className="text-xl font-semibold text-gray-900">
            {task.title}
          </p>
        ) : (
          <input
            type="text"
            value={draftTask.title}
            onChange={(e) =>
              setDraftTask({
                ...draftTask,
                title: e.target.value,
              })
            }
            className="border px-3 py-2 rounded w-full"
          />
        )}

        {/* Notes */}
        {
          !isEditing ? (
            <p className="mt-4 text-gray-700 whitespace-pre-wrap">
              <strong>Notes: </strong>
              {task.notes ? task.notes : "No additional notes"}
            </p>
          ):(
            <textarea
              value={draftTask.notes || ""}
              onChange={(e) =>
                setDraftTask({
                  ...draftTask,
                  notes: e.target.value,
                })
              }
              placeholder="Add notes here..."
              className="border px-3 py-2 mt-4 rounded w-full"
              rows={4}
            />
          )
        }

        {/* Due Date */}
        {!isEditing ? (
          <p className="mt-3 text-gray-700">
            <strong>Due date:</strong>{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
          </p>
        ) : (
          <input
            type="date"
            value={draftTask.dueDate ? draftTask.dueDate.slice(0, 10) : ""}
            onChange={(e) =>
              setDraftTask({
                ...draftTask,
                dueDate: e.target.value || null,
              })
            }
            className="border px-3 py-2 rounded mt-3 w-full"
          />
        )}

        {/* Overdue */}
        {task.isOverdue && (
          <p className="mt-2 text-red-600 font-medium">
            ⚠️ This task is overdue
          </p>
        )}

        {/* Remaining days */}
        {!task.completed &&
          task.remainingDays !== null &&
          !task.isOverdue && (
            <p className="mt-2 text-gray-600">
              {task.remainingDays} days remaining
            </p>
          )}

        {/* Completion info */}
        {task.completed && (
          <p className="mt-3 text-green-600">
            ✅ Completed on{" "}
            {new Date(task.completedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </PageWrapper>
  );
}
