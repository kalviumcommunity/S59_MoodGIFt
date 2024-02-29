const express = require("express");
const router = express.Router();
const { connectDB } = require("../connection/dbConnection");
const { createMemeModel } = require("../models/memeModel");

connectDB();

router.get("/", async (req, res) => {
  try {
    let AngryMemeModel = createMemeModel("Angry");

    const memeData = await AngryMemeModel.find();

    res.send(memeData);
  } catch (error) {
    console.log(error);
  }
});

router.post("/postMeme", async (req, res) => {
  try {
    let AngryMemeModel = createMemeModel("Angry");

    const newMeme = new AngryMemeModel(req.body);
    const savedNewMeme = await newMeme.save();

    res.status(201).json(savedNewMeme);
  } catch (error) {
    res.status(400).json({ error: "Failed to insert data" });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    let AngryMemeModel = createMemeModel("Angry");

    const updateStatus = await AngryMemeModel.findByIdAndUpdate(
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

router.put("/replace/:id", async (req, res) => {
  try {
    let AngryMemeModel = createMemeModel("Angry");

    const updateStatus = await AngryMemeModel.findByIdAndUpdate(
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

router.delete("/delete/:id", async (req, res) => {
  try {
    let AngryMemeModel = createMemeModel("Angry");

    const deleteStatus = await AngryMemeModel.findByIdAndDelete(req.params.id);

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
