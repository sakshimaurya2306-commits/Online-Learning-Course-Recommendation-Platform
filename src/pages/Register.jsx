import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    interests: "Web Development, Artificial Intelligence",
    skills: "HTML, CSS, JavaScript",
    targetSkills: "React, Node.js, MongoDB"
  });

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const payload = {
        ...form,
        interests: form.interests.split(",").map((x) => x.trim()),
        skills: form.skills.split(",").map((x) => x.trim()),
        targetSkills: form.targetSkills.split(",").map((x) => x.trim())
      };

      await api.post("/auth/register", payload);

      setMessage("Registration successful. Please login to continue.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-950";

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl items-center px-6 py-10">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">
          Create learner profile
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Your skills help us recommend better courses.
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
            placeholder="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className={inputClass}
            placeholder="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            className={inputClass}
            placeholder="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <input
            className={inputClass}
            placeholder="Interests"
            value={form.interests}
            onChange={(e) => setForm({ ...form, interests: e.target.value })}
            required
          />

          <input
            className={inputClass}
            placeholder="Current skills"
            value={form.skills}
            onChange={(e) => setForm({ ...form, skills: e.target.value })}
            required
          />

          <input
            className={inputClass}
            placeholder="Target skills"
            value={form.targetSkills}
            onChange={(e) => setForm({ ...form, targetSkills: e.target.value })}
            required
          />

          <button className="w-full rounded-xl bg-indigo-600 py-3 font-bold text-white transition hover:bg-indigo-700">
            Register
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-indigo-600 dark:text-indigo-400">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}