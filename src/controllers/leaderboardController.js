import Enrollment from "../models/Enrollment.js";

export const getLeaderboard = async (req, res) => {
  const enrollments = await Enrollment.find()
    .populate("user", "name skills interests")
    .populate("course", "title category")
    .sort({ progressPercentage: -1, updatedAt: -1 })
    .limit(20);

  const rows = enrollments.map((item, index) => ({
    rank: index + 1,
    learner: item.user?.name || "Learner",
    course: item.course?.title || "Course",
    category: item.course?.category || "General",
    progressPercentage: item.progressPercentage,
    status: item.status,
    certificateIssued: item.certificateIssued,
    points:
      item.progressPercentage +
      (item.status === "completed" ? 100 : 0) +
      (item.certificateIssued ? 50 : 0)
  }));

  res.json(rows);
};