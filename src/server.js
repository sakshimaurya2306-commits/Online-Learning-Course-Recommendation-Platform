// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import morgan from "morgan";
// import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import courseRoutes from "./routes/courseRoutes.js";
// import enrollmentRoutes from "./routes/enrollmentRoutes.js";
// import progressRoutes from "./routes/progressRoutes.js";
// import recommendationRoutes from "./routes/recommendationRoutes.js";
// import leaderboardRoutes from "./routes/leaderboardRoutes.js";

// const app = express();
// connectDB();

// app.use(helmet());
// app.use(cors({ origin: process.env.CLIENT_URL }));
// app.use(express.json());
// app.use(morgan("dev"));

// app.get("/", (req, res) => {
//   res.json({ message: "Online Learning API running" });
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/courses", courseRoutes);
// app.use("/api/enrollments", enrollmentRoutes);
// app.use("/api/progress", progressRoutes);
// app.use("/api/recommendations", recommendationRoutes);
// app.use("/api/leaderboard", leaderboardRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";

const app = express();

connectDB();

app.use(helmet());
// app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Online Learning API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.use((err, req, res, next) => {
  console.log("SERVER ERROR:", err);
  res.status(500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});