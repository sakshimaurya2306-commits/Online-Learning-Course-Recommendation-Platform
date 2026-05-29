import { useEffect, useState } from "react";
import {
  Award,
  CheckCircle2,
  Download,
  PlayCircle,
  FileQuestion,
  BookOpen
} from "lucide-react";
import api from "../services/api";

const fallbackVideo = "https://www.youtube.com/embed/ysz5S6PUM-U";

export default function EnrolledCourses() {
  const [items, setItems] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeEnrollment, setActiveEnrollment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [quizMessage, setQuizMessage] = useState("");

  const load = async () => {
    const { data } = await api.get("/enrollments/me");
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  const openLesson = (enrollment, lesson) => {
    setActiveEnrollment(enrollment);
    setActiveLesson(lesson);
    setQuizMessage("");
  };

  const completeLesson = async () => {
    await api.patch(`/progress/${activeEnrollment._id}`, {
      lessonId: activeLesson._id
    });

    setActiveLesson(null);
    setActiveEnrollment(null);
    load();
  };

  const submitQuiz = async (enrollment) => {
    const selectedAnswers = enrollment.course.quizzes.map((_, index) => answers[index]);

    const { data } = await api.post(`/progress/${enrollment._id}/quiz`, {
      answers: selectedAnswers
    });

    if (data.passed) {
      setQuizMessage(`Quiz passed with ${data.quizScore}%. Certificate will unlock after all lessons are complete.`);
    } else {
      setQuizMessage(`You scored ${data.quizScore}%. Score at least 70% to unlock certificate.`);
    }

    load();
  };

  const printCertificate = (enrollment) => {
    const win = window.open("", "_blank");

    win.document.write(`
      <html>
        <head>
          <title>Certificate</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: #f8fafc;
              padding: 40px;
            }
            .certificate {
              border: 10px solid #4f46e5;
              padding: 60px;
              text-align: center;
              background: white;
            }
            h1 { font-size: 44px; color: #111827; }
            h2 { font-size: 30px; color: #4f46e5; }
            p { font-size: 18px; color: #334155; }
          </style>
        </head>
        <body>
          <div class="certificate">
            <h1>Certificate of Completion</h1>
            <p>This certifies that the learner has successfully completed</p>
            <h2>${enrollment.course.title}</h2>
            <p>Certificate ID: ${enrollment.certificateId}</p>
            <p>Completion Date: ${new Date(enrollment.completedAt).toLocaleDateString()}</p>
          </div>
        </body>
      </html>
    `);

    win.print();
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <p className="font-semibold text-indigo-600 dark:text-indigo-400">
          Your enrolled courses
        </p>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-950 dark:text-white">
          My Learning
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Watch demo lessons, complete practice quizzes, track progress, and unlock certificates.
        </p>
      </div>

      <div className="space-y-6">
        {items.map((enrollment) => (
          <div
            key={enrollment._id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div>
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                  {enrollment.course.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {enrollment.course.subtitle}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {enrollment.course.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <p className="text-3xl font-extrabold text-indigo-600">
                  {enrollment.progressPercentage}%
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Quiz: {enrollment.quizScore || 0}%
                </p>
              </div>
            </div>

            <div className="mt-5 h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-3 rounded-full bg-indigo-600"
                style={{ width: `${enrollment.progressPercentage}%` }}
              />
            </div>

            {enrollment.certificateIssued && (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex gap-3">
                    <Award className="text-emerald-600" size={34} />
                    <div>
                      <h3 className="font-bold text-emerald-800 dark:text-emerald-300">
                        Certificate Unlocked
                      </h3>
                      <p className="text-sm text-emerald-700 dark:text-emerald-400">
                        Certificate ID: {enrollment.certificateId}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => printCertificate(enrollment)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6">
              <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-950 dark:text-white">
                <BookOpen size={18} />
                Lessons
              </h3>

              <div className="grid gap-3 md:grid-cols-2">
                {enrollment.course.lessons.map((lesson) => {
                  const done = enrollment.completedLessons.map(String).includes(String(lesson._id));

                  return (
                    <button
                      key={lesson._id}
                      onClick={() => openLesson(enrollment, lesson)}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition dark:border-slate-800 ${
                        done
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-slate-50 text-slate-800 hover:bg-slate-100 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <PlayCircle size={17} />
                        {lesson.title}
                      </span>

                      {done ? <CheckCircle2 size={18} /> : <span className="text-sm">Open</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-950 dark:text-white">
                <FileQuestion />
                Practice Quiz
              </h3>

              {enrollment.course.quizzes.length === 0 ? (
                <p className="text-slate-600 dark:text-slate-400">
                  No quiz added for this course yet.
                </p>
              ) : (
                <div className="space-y-5">
                  {enrollment.course.quizzes.map((quiz, index) => (
                    <div key={quiz._id}>
                      <p className="font-semibold text-slate-950 dark:text-white">
                        {index + 1}. {quiz.question}
                      </p>

                      <div className="mt-3 grid gap-2 md:grid-cols-2">
                        {quiz.options.map((option, optionIndex) => (
                          <label
                            key={option}
                            className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                          >
                            <input
                              type="radio"
                              name={`quiz-${enrollment._id}-${index}`}
                              onChange={() =>
                                setAnswers({ ...answers, [index]: optionIndex })
                              }
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  {quizMessage && (
                    <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300">
                      {quizMessage}
                    </div>
                  )}

                  <button
                    onClick={() => submitQuiz(enrollment)}
                    className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition hover:bg-indigo-700"
                  >
                    Submit Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            You have not enrolled in any course yet.
          </div>
        )}
      </div>

      {activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                  Demo Lesson
                </p>
                <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">
                  {activeLesson.title}
                </h2>
              </div>

              <button
                onClick={() => setActiveLesson(null)}
                className="rounded-xl border border-slate-300 px-4 py-2 font-bold text-slate-700 dark:border-slate-700 dark:text-slate-200"
              >
                Close
              </button>
            </div>

            <div className="aspect-video overflow-hidden rounded-2xl bg-black">
              <iframe
                className="h-full w-full"
                src={activeLesson.videoUrl || fallbackVideo}
                title={activeLesson.title}
                allowFullScreen
              />
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <h3 className="font-bold text-slate-950 dark:text-white">
                Lesson Notes
              </h3>
              <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">
                {activeLesson.content ||
                  "This lesson introduces the core concept with a short demo video and practice activity."}
              </p>
            </div>

            <button
              onClick={completeLesson}
              className="mt-6 w-full rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-700"
            >
              Mark Lesson Complete
            </button>
          </div>
        </div>
      )}
    </main>
  );
}