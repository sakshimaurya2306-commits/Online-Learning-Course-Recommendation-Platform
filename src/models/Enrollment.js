import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId }],
    progressPercentage: { type: Number, default: 0 },
    quizScore: { type: Number, default: 0 },
    status: { type: String, default: "active" },
    certificateIssued: { type: Boolean, default: false },
    certificateId: { type: String, default: "" },
    completedAt: { type: Date }
  },
  { timestamps: true }
);

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export default mongoose.model("Enrollment", enrollmentSchema);