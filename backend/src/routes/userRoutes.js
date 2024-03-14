require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const { User } = require("../models/userModel");

// joi schema for user validation
const userSchema = Joi.object({
  fullname: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token is required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log(decoded)
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// post end point for creating new user
router.post("/register", async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ error: error.details });
    }

    const { fullname, username, email, password } = req.body;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ existingUsernameError: "Username is already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ existingEmailError: "Email is already registered" });
    }

    const newUser = new User({
      fullname,
      username,
      email,
    });

    newUser.setPassword(password);

    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", data: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// login endpoint
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
