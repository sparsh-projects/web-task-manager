import { useNavigate } from "react-router-dom";

export default function Tasks() {
    const navigate= useNavigate();

    const handleOpenTask = (id) => {
    navigate(`/tasks/${id}`);
    };


  return (
  <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 ">Tasks Page</h1>
        <button onClick={()=>handleOpenTask(1)}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            open task 1
        </button>
  </div>
  )
}
