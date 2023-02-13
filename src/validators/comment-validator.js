const Joi = require("joi");

const validate = require("./validate");

const createCommentSchema = Joi.object({
  detail: Joi.string().trim(),
});

exports.validateCreateComment = validate(createCommentSchema);
