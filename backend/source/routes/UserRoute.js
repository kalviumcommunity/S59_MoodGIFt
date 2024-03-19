require("dotenv").config();
const express = require("express");
const router = express.Router();

const { User } = require("../models/UserModel");
const { userValidationSchema } = require("../validation/joiSchemas");
const { validateData } = require("../validation/validatorFunction");

const { generateToken } = require("../auth/generateToken");
const { verifyToken } = require("../auth/verifyToken");

// post end point for creating new user
router.post("/register", async (req, res) => {
  try {
    const { error } = validateData(req.body, userValidationSchema);

    if (error) {
      return res.status(400).json({ error: error.details });
    }

    const { fullname, username, email, password } = req.body;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already registered" });
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

    const token = generateToken(user._id, 1);

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

    const {password, ...userData} = user;
    res.status(200).json({ userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
