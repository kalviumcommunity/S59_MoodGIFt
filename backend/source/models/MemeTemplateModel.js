const mongoose = require("mongoose");

const memeTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    mood_category: {
      type: String,
      required: true,
    },
    posted_by: {
      type: String,
      required: true,
    },
    upload_date: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { versionKey: false }
);

const MemeTemplate = mongoose.model("Meme_template", memeTemplateSchema);

module.exports = { MemeTemplate };
