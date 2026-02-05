import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import TaskDetails from "./pages/TaskDetails";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navigation bar */}
      <nav className="w-full bg-white shadow-sm p-4 flex flex-wrap justify-center gap-6 text-blue-600 font-medium">
        <Link to="/" className="hover:text-blue-800 transition">Home</Link>
        <Link to="/tasks" className="hover:text-blue-800 transition">Tasks</Link>
        <Link to="/login" className="hover:text-blue-800 transition">Login</Link>
      </nav>

      {/* Main content container */}
      <div className="max-w-4xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetails/></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

    </div>
  );
}
