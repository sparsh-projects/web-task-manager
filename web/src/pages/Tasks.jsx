import { useNavigate, useLocation } from "react-router-dom";
import TaskCard from "../components/TaskCard"; 
import PrimaryButton from "../components/PrimaryButton";
import PageWrapper from "../components/PageWrapper";

export default function Tasks() {
  const navigate = useNavigate();
  const location = useLocation();   // receive navigation state

  const handleOpenTask = (id) => {
    navigate(`/tasks/${id}`);
  };

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Tasks Page</h1>

      {/* Display success message when redirected after login */}
      {location.state?.message && (
        <p className="text-green-600 font-medium mb-4 text-center">
          {location.state.message}
        </p>
      )}

      <TaskCard 
        title="Example Task 1"
        onClick={() => handleOpenTask(1)}
      />


      <div className="mt-6 text-center">
        <PrimaryButton onClick={() => handleOpenTask(1)}>  
          {/* ()=> helps in running fuction only when needed */}
          Open Task 1
        </PrimaryButton>
      </div>
    </PageWrapper>
  );
}
