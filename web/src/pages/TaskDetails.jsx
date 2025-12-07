import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTaskById } from "../api/tasks";

export default function TaskDetails() {
  const { id } = useParams(); 
  const [task, setTask] = useState(null);

  useEffect(() => {
    async function loadTask() {
      const data = await getTaskById(id);
      setTask(data);
    }
    loadTask();
  }, [id]);

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        Task Details
      </h1>

      <div className="bg-white shadow-md rounded-md p-6 border max-w-lg mx-auto">
        <p className="text-lg font-semibold text-gray-900">
          Task ID: {id}
        </p>

        {task && (
          <p className="mt-3 text-gray-700 text-lg">
            Title: {task.title}
          </p>
        )}
      </div>
    </div>
  );
}
