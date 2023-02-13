const Joi = require("joi");

const validate = require("./validate");

const createChapterSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

exports.validateCreateChapter = validate(createChapterSchema);
