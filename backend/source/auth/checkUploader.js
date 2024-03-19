const { MemeTemplate } = require("../models/MemeTemplateModel");
const { User } = require("../models/UserModel");
const { Meme } = require("../models/MemeModel");

// Function to check if the meme or template is uploaded by the request maker or not
const checkUploader = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });

    let posted_by = user.username;
    const isAdmin = user.isAdmin;
    const { memeId, templateId } = req.params;

    if (memeId) {
      const meme = await Meme.findById(memeId);
      if (!meme) {
        return res.status(404).json({ message: "Meme not found" });
      }
      // check if the posted_by and the request maker are same
      if (meme.posted_by !== posted_by && !isAdmin) {
        return res.status(403).json({ message: "Unauthorized action" });
      }
    }

    if (templateId) {
      const memeTemplate = await MemeTemplate.findById(templateId);
      if (!memeTemplate) {
        return res.status(404).json({ message: "Meme template not found" });
      }
      // check if the posted_by and the request maker are same
      if (memeTemplate.posted_by !== posted_by && !isAdmin) {
        return res.status(403).json({ message: "Unauthorized action" });
      }
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error At authorization" });
  }
};

module.exports = { checkUploader };
