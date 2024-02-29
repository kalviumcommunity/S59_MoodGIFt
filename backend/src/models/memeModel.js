const mongoose = require("mongoose");

const memeSchema = new mongoose.Schema(
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
    upload_date: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

const createMemeModel = (collectionName) => {
  return mongoose.model(collectionName, memeSchema);
};

module.exports = { createMemeModel };
