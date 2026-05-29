import express from "express";
import {
  getHomeRecommendations,
  getSimilarCourses,
  getSkillGapRecommendations
} from "../controllers/recommendationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/home", protect, getHomeRecommendations);
router.get("/similar/:courseId", protect, getSimilarCourses);
router.post("/skill-gap", protect, getSkillGapRecommendations);

export default router;