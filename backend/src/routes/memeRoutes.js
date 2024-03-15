const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
// import createMemeModel to dynamically create the model
const { createMemeModel } = require("../models/memeModel");
const { User } = require("../models/userModel");
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

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token is required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

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
router.post("/postMeme/:category", verifyToken, async (req, res) => {
  try {
    const category = req.params.category + "_meme";

    let memeModel = createMemeModel(category);

    let memeBody = req.body;

    const user = await User.findOne({ _id: req.user.userId });
    let posted_by = user.username;
    
    const { error } = memeSchema.validate(memeBody, { abortEarly: false });
    if (error) {
      return res.status(400).json({ error: error.details });
    }

    memeBody = { ...memeBody, posted_by };

    const newMeme = new memeModel(memeBody);
    const savedNewMeme = await newMeme.save();

    res.status(201).json(savedNewMeme);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to insert data" });
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

module.exports = router;
