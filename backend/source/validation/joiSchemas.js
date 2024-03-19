const Joi = require("joi");

const memeTemplateValidationSchema = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().required(),
  mood_category: Joi.string().required(),
  posted_by: Joi.string().required(),
  upload_date: Joi.date().iso(),
});

const memeValidationSchema = Joi.object({
  url: Joi.string().required(),
  caption: Joi.string().required(),
  posted_by: Joi.string().required(),
  mood_category: Joi.string().required(),
});

const userValidationSchema = Joi.object({
  fullname: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  posted_meme_templated: Joi.array().items(Joi.string()),
  posted_memes: Joi.array().items(Joi.string()),
});

module.exports = {
  memeValidationSchema,
  userValidationSchema,
  memeTemplateValidationSchema,
};
