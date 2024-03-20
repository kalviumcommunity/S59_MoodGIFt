const express = require("express");
const router = express.Router();

// importing the models
const { User } = require("../models/UserModel");
const { MemeTemplateCategory } = require("../models/MemeTemplateCategoryModel");
const { MemeTemplate } = require("../models/MemeTemplateModel");

// importing user verification middlewares
const { checkUploader } = require("../auth/checkUploader");
const { verifyToken } = require("../auth/verifyToken");

// schema validation function and schema
const { validateData } = require("../validation/validatorFunction");
const { memeTemplateValidationSchema } = require("../validation/joiSchemas");

router.get("/", async (req, res) => {
  try {
    const categories = await MemeTemplateCategory.find().select("category");
    const categoryNames = categories.map((category) => category.category);
    res.json({ categories: categoryNames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:category", async (req, res) => {
  try {
    const category = req.params.category;

    const categoryData = await MemeTemplateCategory.findOne({
      category,
    }).populate("meme_templates");
    if (!categoryData) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(categoryData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/postTemplate", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });

    let posted_by = user.username;

    const { name, url, mood_category } = req.body;

    const newMemeTemplateBody = {
      name,
      url,
      mood_category,
      posted_by,
    };

    const { error } = validateData(
      newMemeTemplateBody,
      memeTemplateValidationSchema
    );

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details });
    }

    const newMemeTemplate = new MemeTemplate(newMemeTemplateBody);

    const savedTemplate = await newMemeTemplate.save();

    let categoryData = await MemeTemplateCategory.findOne({
      category: mood_category.toLowerCase(),
    });

    if (!categoryData) {
      categoryData = new MemeTemplateCategory({
        category: mood_category.toLowerCase(),
      });
      await categoryData.save();
    }

    console.log(categoryData);
    categoryData.meme_templates.push(savedTemplate._id);
    await categoryData.save();

    user.posted_meme_templates.push(savedTemplate._id);
    await user.save();

    res.status(201).json({
      message: "Meme template posted successfully",
      template: savedTemplate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete(
  "/deleteTemplate/:templateId",
  verifyToken,
  checkUploader,
  async (req, res) => {
    try {
      const templateId = req.params.templateId;

      const memeTemplate = await MemeTemplate.findById(templateId);
      if (!memeTemplate) {
        return res.status(404).json({ message: "Meme template not found" });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.user.userId },
        { $pull: { posted_meme_templates: templateId } },
        { new: true }
      );

      const category = memeTemplate.mood_category.toLowerCase();
      const categoryData = await MemeTemplateCategory.findOneAndUpdate(
        { category },
        { $pull: { meme_templates: templateId } },
        { new: true }
      );

      await MemeTemplate.deleteOne({ _id: templateId });

      res.json({ message: "Meme template deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.patch(
  "/updateTemplate/:templateId",
  verifyToken,
  checkUploader,
  async (req, res) => {
    try {
      const templateId = req.params.templateId;
      const updates = req.body;

      // Check if there are any updates
      if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No updates provided" });
      }

      // Find the meme template
      const memeTemplate = await MemeTemplate.findById(templateId);
      if (!memeTemplate) {
        return res.status(404).json({ message: "Meme template not found" });
      }

      // Apply updates to the meme template
      Object.keys(updates).forEach((key) => {
        memeTemplate[key] = updates[key];
      });

      // Save the updated meme template
      const updatedTemplate = await memeTemplate.save();

      res.json({
        message: "Meme template updated successfully",
        updatedTemplate,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

module.exports = router;
