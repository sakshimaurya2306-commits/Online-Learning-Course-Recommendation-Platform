import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const { data } = await api.post("/auth/login", form);
      login(data);
      setMessage("Login successful. Redirecting to dashboard...");

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your email and password.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-950";

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-6 py-10">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">
          Welcome back
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Continue learning from your dashboard.
        </p>

        {message && (
          <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            className={inputClass}
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            className={inputClass}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button className="w-full rounded-xl bg-indigo-600 py-3 font-bold text-white transition hover:bg-indigo-700">
            Login
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-400">
          New learner?{" "}
          <Link to="/register" className="font-bold text-indigo-600 dark:text-indigo-400">
            Create account
          </Link>
        </p>
      </div>
    </main>
  );
}