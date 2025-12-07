import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("token", "abc123");  
    navigate("/tasks", { state: { message: "Login Successful!" } });
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Login Page</h1>

      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-md font-medium"
      >
        Login
      </button>
    </div>
  );
}
