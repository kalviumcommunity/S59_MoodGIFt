const express = require("express");
const router = express.Router();

// importing the models
const { User } = require("../models/UserModel");
const { MemeCategory } = require("../models/MemeCategoryModel");
const { Meme } = require("../models/MemeModel");
const { MemeTemplate } = require("../models/MemeTemplateModel");

// importing user verification middlewares
const { checkUploader } = require("../auth/checkUploader");
const { verifyToken } = require("../auth/verifyToken");

// schema validation function and schema
const { validateData } = require("../validation/validatorFunction");
const { memeValidationSchema } = require("../validation/joiSchemas");

router.get("/:category", async (req, res) => {
  try {
    const category = req.params.category;
    console.log(category);
    const categoryData = await MemeCategory.findOne({
      category,
    }).populate("memes");
    console.log(categoryData);
    if (!categoryData) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(categoryData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/postMeme", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    const template = await MemeTemplate.findOne({ _id: req.body.templateId });

    let posted_by = user.username;
    const { caption } = req.body;
    const { url, mood_category } = template;

    const newMemeBody = {
      url,
      caption,
      mood_category,
      posted_by,
    };

    const { error } = validateData(newMemeBody, memeValidationSchema);

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details });
    }

    const newMeme = new Meme(newMemeBody);

    const savedMeme = await newMeme.save();

    let categoryData = await MemeCategory.findOne({
      category: mood_category.toLowerCase(),
    });

    if (!categoryData) {
      categoryData = new MemeCategory({
        category: mood_category.toLowerCase(),
      });
      await categoryData.save();
    }

    console.log(categoryData);
    categoryData.memes.push(savedMeme._id);
    await categoryData.save();

    user.posted_memes.push(savedMeme._id);
    await user.save();

    res.status(201).json({
      message: "Meme template posted successfully",
      template: savedMeme,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete(
  "/deleteMeme/:memeId",
  verifyToken,
  checkUploader,
  async (req, res) => {
    try {
      const memeId = req.params.memeId;

      const meme = await Meme.findById(memeId);
      if (!meme) {
        return res.status(404).json({ message: "Meme not found" });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.user.userId },
        { $pull: { posted_memes: memeId } },
        { new: true }
      );

      const category = meme.mood_category.toLowerCase();
      const categoryData = await MemeCategory.findOneAndUpdate(
        { category },
        { $pull: { memes: memeId } },
        { new: true }
      );

      await Meme.deleteOne({ _id: memeId });

      res.json({ message: "Meme deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.patch(
  "/updateMeme/:memeId",
  verifyToken,
  checkUploader,
  async (req, res) => {
    try {
      const memeId = req.params.memeId;
      const updates = req.body;

      // Check if there are any updates
      if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No updates provided" });
      }

      // Find the meme template
      const meme = await Meme.findById(memeId);
      if (!meme) {
        return res.status(404).json({ message: "Meme not found" });
      }

      // Apply updates to the meme template
      Object.keys(updates).forEach((key) => {
        meme[key] = updates[key];
      });

      // Save the updated meme template
      const updatedMeme = await meme.save();

      res.json({
        message: "Meme updated successfully",
        updatedMeme,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

module.exports = router;
