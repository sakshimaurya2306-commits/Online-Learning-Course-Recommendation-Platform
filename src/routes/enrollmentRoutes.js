import express from "express";
import { enrollCourse, getMyEnrollments } from "../controllers/enrollmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:courseId", protect, enrollCourse);
router.get("/me", protect, getMyEnrollments);

export default router;