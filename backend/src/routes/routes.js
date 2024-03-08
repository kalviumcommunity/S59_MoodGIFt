const express = require("express");
const router = express.Router();
const { connectDB } = require("../connection/dbConnection");
const { createMemeModel } = require("../models/memeModel");

connectDB();

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

router.post("/postMeme/:category", async (req, res) => {
  try {
    const category = req.params.category + "_meme";

    let memeModel = createMemeModel(category);

    const newMeme = new memeModel(req.body);
    const savedNewMeme = await newMeme.save();

    res.status(201).json(savedNewMeme);
  } catch (error) {
    res.status(400).json({ error: "Failed to insert data" });
  }
});

router.patch("/patch/:category/:id", async (req, res) => {
  try {
    const category = req.params.category + "_meme";

    let memeModel = createMemeModel(category);

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

router.put("/replace/:category/:id", async (req, res) => {
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
