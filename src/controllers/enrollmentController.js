import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

export const enrollCourse = async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  const exists = await Enrollment.findOne({
    user: req.user._id,
    course: course._id
  });

  if (exists) return res.status(400).json({ message: "Already enrolled" });

  const enrollment = await Enrollment.create({
    user: req.user._id,
    course: course._id
  });

  course.enrollmentCount += 1;
  await course.save();

  res.status(201).json(enrollment);
};

export const getMyEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find({ user: req.user._id }).populate("course");
  res.json(enrollments);
};