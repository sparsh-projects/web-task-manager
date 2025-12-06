import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTaskById } from "../api/tasks";

export default function TaskDetails() {
  const { id } = useParams(); // receives passed state
  const [task, setTask] = useState(null);  // store backend response

  useEffect(() => {
    async function loadTask() {
      const data = await getTaskById(id); // fetch from backend
      setTask(data);
    }

    loadTask();
  }, [id]);   // re-run when id changes

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Task Details</h1>
      <p className="mt-4 text-gray-700">Task ID: {id}</p>
      {
        task && (<p className="mt-2 text-lg">Title: {task.title}</p>)
      }
    </div>
  );
}
