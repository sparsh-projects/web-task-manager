import PageWrapper from "../components/PageWrapper";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
  // const res = await fetch("http://localhost:5000/api/auth/login", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     email: "test@example.com",
  //     password: "password123"
  //   })
  // });
  // const data = await res.json();
  // localStorage.setItem("token", data.token);
  
  const res = await api.post("/auth/login", {
    email: "test@example.com",
    password: "password123",
  });
  localStorage.setItem("token", res.data.token);
  navigate("/tasks");
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
