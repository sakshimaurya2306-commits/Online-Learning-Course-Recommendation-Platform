import Course from "../models/Course.js";

export const getCourses = async (req, res) => {
  const { search, category, level } = req.query;

  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
      { skills: { $regex: search, $options: "i" } }
    ];
  }

  if (category) query.category = category;
  if (level) query.level = level;

  const courses = await Course.find(query).sort({ rating: -1 });
  res.json(courses);
};

export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
};