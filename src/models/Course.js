import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: String,
  duration: Number,
  content: String,
  videoTitle: String,
  videoUrl: String
});

const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answerIndex: Number
});

const courseSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    description: String,
    instructor: String,
    category: String,
    level: String,
    skills: [String],
    tags: [String],
    thumbnail: String,
    durationHours: Number,
    rating: Number,
    enrollmentCount: { type: Number, default: 0 },
    lessons: [lessonSchema],
    quizzes: [quizSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);