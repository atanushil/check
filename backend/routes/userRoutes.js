const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

// Register Route
router.post("/register", async (req, res) => {
  const { name, email, username, password, role } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: "Email or username already in use." });
    }

    const user = new User({
      name,
      email,
      username,
      password,
      role: role || "user",
    });

    const savedUser = await user.save();

    res.status(201).json({
      data: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        username: savedUser.username,
        role: savedUser.role,
        created_at: savedUser.created_at
      },
      message: "User created successfully"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all users
router.get("/get", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ data: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: "User not Find."});
    }

    if(user.password==password){
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status:true
        },
      });
    }else{
      res.status(401).json({message:"Password is not match."});
    }
  
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

