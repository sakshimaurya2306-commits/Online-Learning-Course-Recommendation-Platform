import { useEffect, useState } from "react";
import { Award, Medal, Trophy } from "lucide-react";
import api from "../services/api";

export default function Leaderboard() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get("/leaderboard").then((res) => setRows(res.data));
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <p className="font-semibold text-indigo-600">Learner performance</p>
        <h1 className="mt-2 text-4xl font-extrabold">Leaderboard</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Top learners ranked by progress, completed courses, and certificates.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-5 bg-slate-100 px-5 py-4 text-sm font-bold dark:bg-slate-800">
          <span>Rank</span>
          <span>Learner</span>
          <span>Course</span>
          <span>Progress</span>
          <span>Points</span>
        </div>

        {rows.map((row) => (
          <div
            key={`${row.rank}-${row.learner}-${row.course}`}
            className="grid grid-cols-5 items-center border-t px-5 py-4 text-sm dark:border-slate-800"
          >
            <span className="flex items-center gap-2 font-bold">
              {row.rank === 1 ? <Trophy className="text-yellow-500" size={18} /> : null}
              {row.rank === 2 ? <Medal className="text-slate-400" size={18} /> : null}
              {row.rank === 3 ? <Award className="text-orange-500" size={18} /> : null}
              #{row.rank}
            </span>
            <span>{row.learner}</span>
            <span className="text-slate-500 dark:text-slate-400">{row.course}</span>
            <span>{row.progressPercentage}%</span>
            <span className="font-bold text-indigo-600">{row.points}</span>
          </div>
        ))}

        {rows.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No leaderboard data yet. Enroll and complete lessons first.
          </div>
        )}
      </div>
    </main>
  );
}