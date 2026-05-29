// import User from "../models/User.js";
// import generateToken from "../utils/generateToken.js";

// export const registerUser = async (req, res) => {
//   const { name, email, password, interests, skills, targetSkills } = req.body;

//   const exists = await User.findOne({ email });
//   if (exists) return res.status(400).json({ message: "User already exists" });

//   const user = await User.create({
//     name,
//     email,
//     password,
//     interests,
//     skills,
//     targetSkills
//   });

//   res.status(201).json({
//     token: generateToken(user._id),
//     user: {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       interests: user.interests,
//       skills: user.skills,
//       targetSkills: user.targetSkills
//     }
//   });
// };

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user || !(await user.matchPassword(password))) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }

//   res.json({
//     token: generateToken(user._id),
//     user: {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       interests: user.interests,
//       skills: user.skills,
//       targetSkills: user.targetSkills
//     }
//   });
// };

// export const getMe = async (req, res) => {
//   res.json(req.user);
// };

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, interests, skills, targetSkills } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      interests,
      skills,
      targetSkills
    });

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        interests: user.interests,
        skills: user.skills,
        targetSkills: user.targetSkills
      }
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message || "Registration failed on server" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        interests: user.interests,
        skills: user.skills,
        targetSkills: user.targetSkills
      }
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message || "Login failed on server" });
  }
};

export const getMe = async (req, res) => {
  res.json(req.user);
};