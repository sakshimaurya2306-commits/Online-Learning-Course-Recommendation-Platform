# Online Learning & Course Recommendation Platform

A full-stack MERN EdTech platform where learners can browse courses, enroll, watch demo lessons, take quizzes, track progress, unlock certificates, and receive personalized course recommendations.

## Project Overview

LearnMatch is an online learning platform inspired by modern LMS and MOOC products. It helps students discover relevant courses based on their interests, skills, target skills, enrolled courses, and course tags.

This project is built as a portfolio-ready full-stack development project for MERN Stack, Frontend Developer, Backend Developer, Software Engineer, and EdTech roles.

## Features

- User registration and login
- JWT authentication
- Modern responsive UI
- Dark and light mode toggle
- Course catalog with search
- Course detail pages
- Course enrollment
- My Learning dashboard
- Demo YouTube lesson player
- Lesson completion tracking
- Practice quizzes
- Certificate unlock after completion
- Leaderboard
- Personalized course recommendations
- Similar course recommendations
- Skill-based recommendation logic
- MongoDB Atlas database integration

## Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- CORS
- Helmet
- Morgan

## Recommendation Logic

The recommendation system uses a simple hybrid approach:

- Matches learner interests with course categories
- Matches learner skills with course skills
- Matches target skills with course tags
- Uses enrolled course history
- Boosts highly rated and popular courses
- Excludes already enrolled courses

Recommendation sections include:

- Recommended for you
- Because you viewed this course
- Skill-gap based suggestions

## Folder Structure

```text
Online-Learning-Course-Recommendation-Platform/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seed/
│   │   ├── utils/
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
├── docs/
│   └── screenshots/
│
├── README.md
└── .gitignore

## Screenshots

Add screenshots inside:

## Screenshots
```
### Homepage
![Homepage](docs/screenshots/Homepage_Edutech.jpeg)
---

### Register Page
![Register Page](docs/screenshots/register-page.jpeg)
---
### Login Page
![Login Page](docs/screenshots/login-page.jpeg)
---
### Course Catalog
![Course Catalog](docs/screenshots/course-listing.jpeg)
---
### Course Detail Page
![Course Detail Page](docs/screenshots/course-details.jpeg)
---
### My Learning Dashboard
![My Learning Dashboard](docs/screenshots/dashboard.jpeg)
---
### Lesson Video Modal
![Lesson Video Modal](docs/screenshots/Video_model.jpeg)
---
### Leaderboard
![Leaderboard](docs/screenshots/progress-tracking.jpeg)

---

 ## Installation Guide
1. Clone The Repository
git clone https://github.com/your-username/online-learning-course-recommendation-platform.git
cd online-learning-course-recommendation-platform

2. Install Frontend Dependencies
cd client
npm install

3. Install Backend Dependencies
cd ../server
npm install
Environment Variable

Create a .env file inside the server folder:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
Example:

PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/learning_recommender?retryWrites=true&w=majority
JWT_SECRET=super_secret_learning_platform_key
CLIENT_URL=http://localhost:5173
Never upload .env to GitHub.

Create .env.example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

## How To Run The Project
Start Backend:
cd server
npm run dev

Backend runs on:

http://localhost:5000
Seed Sample Courses
Open another terminal:

cd server
npm run seed
This adds sample courses, lessons, quizzes, and YouTube lesson links to MongoDB.

Start Frontend:
cd client
npm run dev
Frontend runs on:
http://localhost:5173

## Demo Flow

- Register as a learner.
- Login with the same email and password.
- Browse the course catalog.
- Open a course detail page.
- Enroll in a course.
- Go to My Learning.
- Open a lesson and watch the demo video.
- Mark lesson complete.
- Attempt the practice quiz.
- Complete all lessons and pass the quiz.
- Unlock and download the certificate.
- Check the leaderboard.

##  Database Collections
users
courses
enrollments
progress
Course Completion Logic

## A certificate is unlocked when:

All lessons are completed
Quiz score is 70% or more

## After completion, the learner gets:
Completion status
Certificate ID
Downloadable certificate
Leaderboard points
Learning Outcomes

## This project demonstrates:

Full-stack MERN development
REST API design
MongoDB schema design
JWT authentication
Protected routes
Recommendation logic
Progress tracking
Quiz handling
Certificate generation
Responsive UI design
Dark/light theme implementation
GitHub documentation
Future Improvements
Instructor dashboard
Admin course management
Payment integration
Real video hosting
Email verification
Course reviews and ratings
Advanced collaborative filtering
AI-based skill-gap analysis
Docker deployment
Unit and integration tests


## Author
Sakshi Ramakabal Maurya B.Tech in Information Technology at K.j. Somaiya institute of technology

## License
This project is open-source and available for learning and portfolio use.