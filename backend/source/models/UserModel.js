const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      salt: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    posted_meme_templates: [
      { type: mongoose.Schema.Types.ObjectId, ref: "meme_template" },
    ],
    posted_memes: [{ type: mongoose.Schema.Types.ObjectId, ref: "meme" }],
  },
  { timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = crypto.createHash("sha512").update(password).digest("hex");
};

userSchema.methods.validatePassword = function (password) {
  const hash = crypto.createHash("sha512").update(password).digest("hex");
  return this.password === hash;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
