import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import TaskDetails from "./pages/TaskDetails";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="p-6">
      {/* Navigation bar */}
      <nav className="flex gap-4 mb-6 text-blue-600">
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/login">Login</Link>
      </nav>

      {/* Routing section */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
        <Route path="/tasks/details" element={<TaskDetails />} />
      </Routes>
    </div>
  );
}
