import { useEffect, useState } from "react";
import api from "../services/api";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  const loadCourses = async () => {
    const { data } = await api.get(`/courses?search=${search}`);
    setCourses(data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-950 dark:text-white">
            Course Catalog
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Search job-ready courses and learning paths.
          </p>
        </div>

        <div className="flex gap-3">
          <input
            className="w-80 rounded-xl border border-slate-300 bg-white px-5 py-4 text-slate-950 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-950"
            placeholder="Search AI, React, Data..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={loadCourses}
            className="rounded-xl bg-indigo-600 px-7 py-4 font-bold text-white transition hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid gap-7 md:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>

      {courses.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          No courses found. Try another search keyword.
        </div>
      )}
    </main>
  );
}