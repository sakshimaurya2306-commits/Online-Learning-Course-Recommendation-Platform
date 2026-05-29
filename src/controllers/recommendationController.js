import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

const overlap = (a = [], b = []) => {
  const set = new Set(b.map((x) => x.toLowerCase()));
  return a.filter((x) => set.has(x.toLowerCase())).length;
};

export const getHomeRecommendations = async (req, res) => {
  const courses = await Course.find();
  const enrollments = await Enrollment.find({ user: req.user._id }).populate("course");
  const enrolledIds = enrollments.map((e) => e.course._id.toString());

  const userSignals = [
    ...req.user.interests,
    ...req.user.skills,
    ...req.user.targetSkills
  ];

  const historySignals = enrollments.flatMap((e) => [
    e.course.category,
    ...e.course.skills,
    ...e.course.tags
  ]);

  const scored = courses
    .filter((course) => !enrolledIds.includes(course._id.toString()))
    .map((course) => {
      let score = 0;
      score += overlap(course.skills, userSignals) * 5;
      score += overlap(course.tags, userSignals) * 3;
      score += userSignals.includes(course.category) ? 4 : 0;
      score += overlap(course.skills, historySignals) * 2;
      score += course.rating;
      score += course.enrollmentCount / 20;
      return { course, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.course);

  res.json(scored.slice(0, 6));
};

export const getSimilarCourses = async (req, res) => {
  const source = await Course.findById(req.params.courseId);
  const courses = await Course.find({ _id: { $ne: source._id } });

  const similar = courses
    .map((course) => ({
      course,
      score:
        overlap(course.skills, source.skills) * 5 +
        overlap(course.tags, source.tags) * 3 +
        (course.category === source.category ? 4 : 0) +
        course.rating
    }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.course);

  res.json(similar.slice(0, 4));
};

export const getSkillGapRecommendations = async (req, res) => {
  const { targetSkills } = req.body;
  const missing = targetSkills.filter((s) => !req.user.skills.includes(s));

  const courses = await Course.find({
    skills: { $in: missing }
  }).sort({ rating: -1 });

  res.json({ missingSkills: missing, courses });
};