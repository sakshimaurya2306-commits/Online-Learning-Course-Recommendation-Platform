import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  PlayCircle,
  Sparkles,
  Trophy
} from "lucide-react";
import api from "../services/api";
import CourseCard from "../components/CourseCard";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    if (user) {
      api.get("/recommendations/home").then((res) => setRecs(res.data));
    }
  }, [user]);

  if (!user) {
    return (
      <main className="bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
        <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
                <Sparkles size={16} />
                AI-inspired course discovery for learners
              </div>

              <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
                Build skills faster with a smarter learning platform.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                LearnMatch helps students browse courses, enroll, track progress,
                complete lessons, unlock certificates, and discover courses based
                on interests, skills, and learning goals.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
                >
                  Get Started
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 font-bold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                >
                  Login
                </Link>
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-2xl font-extrabold">50+</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Course paths</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-2xl font-extrabold">3</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Reco modes</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-2xl font-extrabold">100%</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">MERN stack</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                  alt="Online learning dashboard"
                  className="h-72 w-full object-cover"
                />

                <div className="space-y-4 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                        Recommended path
                      </p>
                      <h2 className="mt-1 text-2xl font-extrabold text-slate-950 dark:text-white">
                        Full Stack Developer Track
                      </h2>
                    </div>

                    <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
                      <CheckCircle2 />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <FeaturePill icon={<BookOpen size={17} />} label="Course catalog" />
                    <FeaturePill icon={<Brain size={17} />} label="Smart recommendations" />
                    <FeaturePill icon={<BarChart3 size={17} />} label="Progress tracking" />
                    <FeaturePill icon={<Award size={17} />} label="Certificates" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="font-bold text-indigo-600 dark:text-indigo-400">Portfolio-ready features</p>
              <h2 className="mt-2 text-3xl font-extrabold">What this project demonstrates</h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <InfoCard
              icon={<Brain />}
              title="Hybrid Recommendations"
              text="Suggests courses using learner interests, skills, course tags, category, popularity, and enrollment history."
            />
            <InfoCard
              icon={<PlayCircle />}
              title="Learning Progress"
              text="Learners can enroll, complete lessons, track progress percentage, and finish courses."
            />
            <InfoCard
              icon={<Trophy />}
              title="Career Proof"
              text="Includes leaderboard, certificates, protected routes, REST APIs, MongoDB models, and clean GitHub documentation."
            />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="font-bold text-indigo-600 dark:text-indigo-400">
          Welcome back, {user.name}
        </p>

        <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-950 dark:text-white">
              Your personalized learning dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
              Continue learning, discover recommended courses, and build skills
              for your target role.
            </p>
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
          >
            Browse Courses
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="font-bold text-indigo-600 dark:text-indigo-400">For you</p>
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">
              Recommended courses
            </h2>
          </div>
        </div>

        {recs.length > 0 ? (
          <div className="grid gap-7 md:grid-cols-3">
            {recs.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-slate-600 dark:text-slate-400">
              No recommendations yet. Browse courses and enroll to improve your feed.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function FeaturePill({ icon, label }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
      <span className="text-indigo-600 dark:text-indigo-400">{icon}</span>
      {label}
    </div>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 inline-flex rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
        {icon}
      </div>

      <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
        {text}
      </p>
    </div>
  );
}