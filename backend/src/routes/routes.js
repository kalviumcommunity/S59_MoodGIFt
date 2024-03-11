const express = require("express");
const router = express.Router();
const Joi = require("joi");

// import connectDB function to initiate connection
const { connectDB } = require("../connection/dbConnection");

// import createMemeModel to dynamically create the model
const { createMemeModel } = require("../models/memeModel");

const { User } = require("../models/userModel");
connectDB();

// joi meme schema for validation
const memeSchema = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().uri().required(),
  mood_category: Joi.string().required(),
});

// joi meme schema for patch request validation
const patchMemeSchema = Joi.object({
  name: Joi.string(),
  url: Joi.string().uri(),
  mood_category: Joi.string(),
}).or("name", "url", "mood_category");

// joi schema for user validation
const userSchema = Joi.object({
  fullname: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// get endpoint for api
router.get("/:category", async (req, res) => {
  try {
    const category = req.params.category + "_meme";

    let memeModel = createMemeModel(category);

    const memeData = await memeModel.find();

    res.send(memeData);
  } catch (error) {
    console.log(error);
  }
});

// post meme endpoint for posting memes
router.post("/postMeme/:category", async (req, res) => {
  try {
    const category = req.params.category + "_meme";

    let memeModel = createMemeModel(category);

    const { error } = memeSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ error: error.details });
    }

    const newMeme = new memeModel(req.body);
    const savedNewMeme = await newMeme.save();

    res.status(201).json(savedNewMeme);
  } catch (error) {
    res.status(400).json({ error: "Failed to insert data" });
  }
});

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
      password,
    });

    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", data: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// patch endpoint
router.patch("/patch/:category/:id", async (req, res) => {
  try {
    const category = req.params.category + "_meme";

    let memeModel = createMemeModel(category);

    const { error } = patchMemeSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({ error: error.details });
    }

    const updateStatus = await memeModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (updateStatus) {
      res.status(200).json(updateStatus);
    } else {
      res.status(404).json({ error: "Data Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// put endpoint
router.put("/replace/:category/:id", async (req, res) => {
  try {
    const category = req.params.category + "_meme";

    let memeModel = createMemeModel(category);

    const { error } = memeSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updateStatus = await memeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (updateStatus) {
      res.status(200).json(updateStatus);
    } else {
      res.status(404).json({ error: "Data Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// delete endpoint
router.delete("/delete/:category/:id", async (req, res) => {
  try {
    const category = req.params.category + "_meme";

    let memeModel = createMemeModel(category);
    const deleteStatus = await memeModel.findByIdAndDelete(req.params.id);

    if (deleteStatus) {
      res.status(200).json({ message: "Data deleted successfully" });
    } else {
      res.status(404).json({ error: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { router };
