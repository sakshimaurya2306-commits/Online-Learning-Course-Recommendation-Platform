import express from "express";
import { submitQuiz, updateProgress } from "../controllers/progressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.patch("/:enrollmentId", protect, updateProgress);
router.post("/:enrollmentId/quiz", protect, submitQuiz);

export default router;