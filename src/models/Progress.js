import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    lesson: { type: mongoose.Schema.Types.ObjectId },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);