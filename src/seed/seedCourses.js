import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Progress from "../models/Progress.js";
import connectDB from "../config/db.js";

const courses = [
  {
    title: "MERN Stack Bootcamp",
    subtitle: "Build full-stack apps with MongoDB, Express, React and Node",
    description: "Complete practical MERN course for full-stack developer roles.",
    instructor: "Rahul Sharma",
    category: "Web Development",
    level: "Beginner",
    skills: ["React", "Node.js", "Express", "MongoDB"],
    tags: ["mern", "javascript", "api", "frontend", "backend"],
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    durationHours: 18,
    rating: 4.8,
    lessons: [
      {
        title: "React Basics",
        duration: 45,
        content: "Learn components, props, state, and how React renders UI.",
        videoTitle: "React Course for Beginners",
        videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8"
      },
      {
        title: "Express APIs",
        duration: 50,
        content: "Create REST APIs using Node.js and Express.",
        videoTitle: "Node.js and Express.js Full Course",
        videoUrl: "https://www.youtube.com/embed/Oe421EPjeBE"
      },
      {
        title: "MongoDB Models",
        duration: 40,
        content: "Understand MongoDB collections, documents, and Mongoose schemas.",
        videoTitle: "MongoDB Crash Course",
        videoUrl: "https://www.youtube.com/embed/ofme2o29ngU"
      }
    ],
    quizzes: [
      {
        question: "Which database is used in MERN?",
        options: ["MySQL", "MongoDB", "SQLite", "Oracle"],
        answerIndex: 1
      },
      {
        question: "Which library is used for building UI in MERN?",
        options: ["React", "Laravel", "Django", "Spring"],
        answerIndex: 0
      }
    ]
  },
  {
    title: "AI for Beginners",
    subtitle: "Understand machine learning and AI concepts",
    description: "Learn AI foundations, models, datasets and real applications.",
    instructor: "Ananya Mehta",
    category: "Artificial Intelligence",
    level: "Beginner",
    skills: ["AI", "Machine Learning", "Python"],
    tags: ["ai", "ml", "data", "python"],
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    durationHours: 12,
    rating: 4.7,
    lessons: [
      {
        title: "What is AI?",
        duration: 30,
        content: "Understand artificial intelligence, real-world use cases, and common AI terms.",
        videoTitle: "Artificial Intelligence Explained",
        videoUrl: "https://www.youtube.com/embed/JMUxmLyrhSk"
      },
      {
        title: "Machine Learning",
        duration: 45,
        content: "Learn how machines use data to make predictions and decisions.",
        videoTitle: "Machine Learning for Everybody",
        videoUrl: "https://www.youtube.com/embed/i_LwzRVP7bg"
      }
    ],
    quizzes: [
      {
        question: "Machine learning mainly learns from what?",
        options: ["Electricity", "Data", "CSS", "Routers"],
        answerIndex: 1
      }
    ]
  },
  {
    title: "Data Science Career Path",
    subtitle: "Python, pandas, visualization and analytics",
    description: "A practical course for becoming job-ready in data science.",
    instructor: "Neha Verma",
    category: "Data Science",
    level: "Intermediate",
    skills: ["Python", "Pandas", "Data Visualization"],
    tags: ["data", "analytics", "python"],
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    durationHours: 16,
    rating: 4.6,
    lessons: [
      {
        title: "Python for Data",
        duration: 55,
        content: "Learn Python basics used in data analysis and automation.",
        videoTitle: "Python Full Course",
        videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw"
      },
      {
        title: "Data Cleaning",
        duration: 60,
        content: "Clean messy datasets using pandas and prepare them for analysis.",
        videoTitle: "Pandas Data Science Tutorial",
        videoUrl: "https://www.youtube.com/embed/vmEHCJofslg"
      }
    ],
    quizzes: [
      {
        question: "Which Python library is popular for data tables?",
        options: ["React", "Pandas", "Express", "JWT"],
        answerIndex: 1
      }
    ]
  },
  {
    title: "Cybersecurity Essentials",
    subtitle: "Security basics for modern developers",
    description: "Learn web security, authentication, threats and secure coding.",
    instructor: "Karan Singh",
    category: "Cybersecurity",
    level: "Beginner",
    skills: ["Security", "JWT", "Web Security"],
    tags: ["security", "cybersecurity", "auth"],
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    durationHours: 10,
    rating: 4.5,
    lessons: [
      {
        title: "Security Basics",
        duration: 35,
        content: "Learn common threats, safe authentication, and secure coding habits.",
        videoTitle: "Cyber Security Full Course",
        videoUrl: "https://www.youtube.com/embed/inWWhr5tnEA"
      },
      {
        title: "JWT Security",
        duration: 45,
        content: "Understand JWT authentication and how protected APIs work.",
        videoTitle: "JWT Authentication Tutorial",
        videoUrl: "https://www.youtube.com/embed/7Q17ubqLfaM"
      }
    ],
    quizzes: [
      {
        question: "What does JWT help with?",
        options: ["Styling pages", "Authentication", "Image editing", "Database backup"],
        answerIndex: 1
      }
    ]
  }
];

await connectDB();

await Progress.deleteMany();
await Enrollment.deleteMany();
await Course.deleteMany();

await Course.insertMany(courses);

console.log("Courses with YouTube lessons seeded successfully");
await mongoose.connection.close();