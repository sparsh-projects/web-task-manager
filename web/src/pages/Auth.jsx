import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import PrimaryButton from "../components/PrimaryButton";
import api from "../api/client";

export default function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";

      const res = await api.post(endpoint, {
        email,
        password,
      });

      // Only login returns token
      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        navigate("/tasks");
      } else {
        // After register → switch to login
        setIsLogin(true);
        setError("Account created. Please login.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold mb-6 text-center">
        {isLogin ? "Login" : "Create Account"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-black rounded-md px-4 py-2"
        />

       <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-black rounded-md px-4 py-2"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && (
          <p className="text-sm text-center text-red-500">
            {error}
          </p>
        )}

        <PrimaryButton type="submit" disabled={loading}>
          {loading
            ? "Processing..."
            : isLogin
            ? "Login"
            : "Register"}
        </PrimaryButton>

        <p className="text-sm text-center text-gray-600">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </form>
    </PageWrapper>
  );
}
