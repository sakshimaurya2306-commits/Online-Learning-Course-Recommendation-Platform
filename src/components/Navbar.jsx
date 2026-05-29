import { Link } from "react-router-dom";
import { BookOpen, LogOut, Moon, Sun, Trophy } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-slate-950 dark:text-white">
          <span className="rounded-xl bg-indigo-600 p-2 text-white">
            <BookOpen size={22} />
          </span>
          LearnMatch
        </Link>

        <div className="flex items-center gap-4 text-sm font-semibold text-slate-800 dark:text-slate-100">
          {user && (
            <>
              <Link className="hover:text-indigo-600 dark:hover:text-indigo-400" to="/courses">
                Courses
              </Link>

              <Link className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400" to="/leaderboard">
                <Trophy size={16} />
                Leaderboard
              </Link>

              <Link className="hover:text-indigo-600 dark:hover:text-indigo-400" to="/my-learning">
                My Learning
              </Link>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="rounded-lg border border-slate-300 p-2 text-slate-800 dark:border-slate-700 dark:text-slate-100"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {!user ? (
            <>
              <Link className="hover:text-indigo-600 dark:hover:text-indigo-400" to="/login">
                Login
              </Link>

              <Link to="/register" className="rounded-lg bg-indigo-600 px-4 py-2 text-white">
                Register
              </Link>
            </>
          ) : (
            <button onClick={logout} className="flex items-center gap-1 text-red-500">
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}