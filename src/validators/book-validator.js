const Joi = require("joi");

const validate = require("./validate");

const createBookSchema = Joi.object({
  title: Joi.string().required(),
  summary: Joi.string().required(),
  book_cover: Joi.string(),
});

exports.validateCreateBook = validate(createBookSchema);
