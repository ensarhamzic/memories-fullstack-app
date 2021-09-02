const Joi = require("joi");

const memoryBooksJoiSchema = Joi.object({
  title: Joi.string().required().max(30),
  description: Joi.string().max(150),
  imageUrl: Joi.string().required(),
});

module.exports = memoryBooksJoiSchema;
