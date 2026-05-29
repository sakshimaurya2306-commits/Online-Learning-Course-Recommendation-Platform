import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import EnrolledCourses from "./pages/EnrolledCourses";
import Leaderboard from "./pages/Leaderboard";

const Protected = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/courses"
                element={
                  <Protected>
                    <Courses />
                  </Protected>
                }
              />

              <Route
                path="/courses/:id"
                element={
                  <Protected>
                    <CourseDetails />
                  </Protected>
                }
              />

              <Route
                path="/leaderboard"
                element={
                  <Protected>
                    <Leaderboard />
                  </Protected>
                }
              />

              <Route
                path="/my-learning"
                element={
                  <Protected>
                    <EnrolledCourses />
                  </Protected>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}