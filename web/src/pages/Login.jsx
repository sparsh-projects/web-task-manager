import PageWrapper from "../components/PageWrapper";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("token", "abc123");  
    navigate("/tasks", { state: { message: "Login Successful!" } });
  };

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">Login Page</h1>

      <div className="text-center">
      <PrimaryButton onClick={handleLogin}>
        Login
      </PrimaryButton>
      </div>
    </PageWrapper>
  );
}
