import Enrollment from "../models/Enrollment.js";
import Progress from "../models/Progress.js";

const createCertificateId = () => {
  return `CERT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

const issueCertificateIfReady = (enrollment) => {
  if (enrollment.progressPercentage >= 100 && enrollment.quizScore >= 70) {
    enrollment.status = "completed";
    enrollment.completedAt = enrollment.completedAt || new Date();

    if (!enrollment.certificateIssued) {
      enrollment.certificateIssued = true;
      enrollment.certificateId = createCertificateId();
    }
  }
};

export const updateProgress = async (req, res) => {
  const { lessonId } = req.body;

  const enrollment = await Enrollment.findById(req.params.enrollmentId).populate("course");

  if (!enrollment) {
    return res.status(404).json({ message: "Enrollment not found" });
  }

  if (enrollment.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not allowed" });
  }

  if (!enrollment.completedLessons.map(String).includes(String(lessonId))) {
    enrollment.completedLessons.push(lessonId);
  }

  const totalLessons = enrollment.course.lessons.length || 1;

  enrollment.progressPercentage = Math.round(
    (enrollment.completedLessons.length / totalLessons) * 100
  );

  await Progress.findOneAndUpdate(
    {
      user: req.user._id,
      course: enrollment.course._id,
      lesson: lessonId
    },
    {
      user: req.user._id,
      course: enrollment.course._id,
      lesson: lessonId,
      completed: true
    },
    { upsert: true, new: true }
  );

  issueCertificateIfReady(enrollment);

  await enrollment.save();
  res.json(enrollment);
};

export const submitQuiz = async (req, res) => {
  const { answers } = req.body;

  const enrollment = await Enrollment.findById(req.params.enrollmentId).populate("course");

  if (!enrollment) {
    return res.status(404).json({ message: "Enrollment not found" });
  }

  if (enrollment.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not allowed" });
  }

  const quizzes = enrollment.course.quizzes || [];

  if (quizzes.length === 0) {
    enrollment.quizScore = 100;
  } else {
    let correct = 0;

    quizzes.forEach((quiz, index) => {
      if (Number(answers[index]) === Number(quiz.answerIndex)) {
        correct += 1;
      }
    });

    enrollment.quizScore = Math.round((correct / quizzes.length) * 100);
  }

  issueCertificateIfReady(enrollment);

  await enrollment.save();

  res.json({
    quizScore: enrollment.quizScore,
    passed: enrollment.quizScore >= 70,
    certificateIssued: enrollment.certificateIssued,
    certificateId: enrollment.certificateId,
    enrollment
  });
};