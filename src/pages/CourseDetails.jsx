import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Clock, PlayCircle, Star, Users } from "lucide-react";
import api from "../services/api";
import CourseCard from "../components/CourseCard";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get(`/courses/${id}`).then((res) => setCourse(res.data));
    api
      .get(`/recommendations/similar/${id}`)
      .then((res) => setSimilar(res.data))
      .catch(() => {});
  }, [id]);

  const enroll = async () => {
    try {
      await api.post(`/enrollments/${id}`);
      setMessage("Enrolled successfully. Open My Learning to start progress tracking.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Enrollment failed.");
    }
  };

  if (!course) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-10 text-slate-700 dark:text-slate-300">
        Loading course...
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section className="grid gap-10 lg:grid-cols-2">
        <img
          src={`${course.thumbnail}?auto=format&fit=crop&w=1200&q=80`}
          className="h-[420px] w-full rounded-3xl object-cover shadow-xl"
          alt={course.title}
        />

        <div className="flex flex-col justify-center">
          <p className="font-bold text-indigo-600 dark:text-indigo-400">
            {course.category}
          </p>

          <h1 className="mt-3 text-5xl font-extrabold leading-tight text-slate-950 dark:text-white">
            {course.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
            {course.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {course.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-7 grid max-w-xl grid-cols-3 gap-3">
            <Info icon={<Star size={18} />} label={`${course.rating} rating`} />
            <Info icon={<Clock size={18} />} label={`${course.durationHours} hours`} />
            <Info icon={<Users size={18} />} label={`${course.enrollmentCount} learners`} />
          </div>

          {message && (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
              {message}
            </div>
          )}

          <button
            onClick={enroll}
            className="mt-8 w-fit rounded-xl bg-indigo-600 px-8 py-4 font-bold text-white transition hover:bg-indigo-700"
          >
            Enroll Now
          </button>
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-5 flex items-center gap-2">
          <PlayCircle className="text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">
            Lessons
          </h2>
        </div>

        <div className="space-y-4">
          {course.lessons.map((lesson, index) => (
            <div
              key={lesson._id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <p className="font-bold text-slate-950 dark:text-white">
                  {index + 1}. {lesson.title}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {lesson.content}
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {lesson.duration} min
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-6 text-3xl font-extrabold text-slate-950 dark:text-white">
          Because you viewed this course
        </h2>

        <div className="grid gap-7 md:grid-cols-4">
          {similar.map((item) => (
            <CourseCard key={item._id} course={item} />
          ))}
        </div>
      </section>
    </main>
  );
}

function Info({ icon, label }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
      <span className="text-indigo-600 dark:text-indigo-400">{icon}</span>
      {label}
    </div>
  );
}