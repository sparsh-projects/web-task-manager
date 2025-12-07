import { useNavigate, useLocation } from "react-router-dom";

export default function Tasks() {
  const navigate = useNavigate();
  const location = useLocation();   // receive navigation state

  const handleOpenTask = (id) => {
    navigate(`/tasks/${id}`);
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Tasks Page</h1>

      {/* Display success message when redirected after login */}
      {location.state?.message && (
        <p className="text-green-600 font-medium mb-4">
          {location.state.message}
        </p>
      )}

      <button
        onClick={() => handleOpenTask(1)}
        className="bg-purple-600 hover:bg-purple-700 transition text-white px-5 py-2 rounded-md font-medium"
      >
        Open Task 1
      </button>
    </div>
  );
}
