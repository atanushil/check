const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.register = async (req, res) => {
  const { name, email, username, password, isAdmin } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });
    if (existingUser) {
      return res.status(409).json({ message: "Email or username already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      username,
      password: hashedPassword,
      isAdmin: isAdmin || false
    });

    const savedUser = await user.save();

    const token = generateToken(savedUser._id);

    res.status(201).json({
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        username: savedUser.username,
        isAdmin: savedUser.isAdmin,
        created_at: savedUser.created_at
      },
      token,
      message: "User registered successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin
      },
      token,
      message: "Login successful"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.protected = (req, res) => {
  res.json({
    message: "Access granted to protected route",
    user: req.user
  });
};

exports.adminProtected = (req, res) => {
  res.json({
    message: "Access granted to admin route",
    user: req.user
  });
};
