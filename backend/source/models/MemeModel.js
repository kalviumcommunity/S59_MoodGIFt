const mongoose = require("mongoose");

const memeSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      require: true,
    },
    posted_by: {
      type: String,
      required: true,
    },
    mood_category: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Meme = mongoose.model("meme", memeSchema);

module.exports = { Meme };
