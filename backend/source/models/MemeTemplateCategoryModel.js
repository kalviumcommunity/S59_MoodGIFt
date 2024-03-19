const mongoose = require("mongoose");

const memeTemplateCategorySchema = new mongoose.Schema({
  category: {
    type: String,
  },
  meme_templates: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Meme_template" },
  ],
});

const MemeTemplateCategory = mongoose.model(
  "Meme_template_category",
  memeTemplateCategorySchema
);

module.exports = { MemeTemplateCategory };
