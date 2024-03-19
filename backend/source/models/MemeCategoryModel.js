const mongoose = require("mongoose");

const memeCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  memes: [{ type: mongoose.Schema.Types.ObjectId, ref: "meme" }],
});

const MemeCategory = mongoose.model("meme_category", memeCategorySchema);

module.exports = { MemeCategory };
