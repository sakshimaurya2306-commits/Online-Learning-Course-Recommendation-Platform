import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function CourseCard({ course }) {
  return (
    <Link
      to={`/courses/${course._id}`}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
    >
      <img
        src={`${course.thumbnail}?auto=format&fit=crop&w=900&q=80`}
        className="h-44 w-full object-cover"
        alt={course.title}
      />

      <div className="p-5">
        <div className="mb-4 flex items-center justify-between text-xs">
          <span className="rounded-full bg-indigo-50 px-3 py-1 font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            {course.category}
          </span>

          <span className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300">
            <Star size={14} className="text-yellow-500" />
            {course.rating}
          </span>
        </div>

        <h3 className="text-lg font-extrabold text-slate-950 dark:text-white">
          {course.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {course.subtitle}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {course.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}