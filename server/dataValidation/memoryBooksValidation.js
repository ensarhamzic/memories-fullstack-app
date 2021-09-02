const Joi = require("joi");

const memoryBooksJoiSchema = Joi.object({
  title: Joi.string().required().max(30),
  location: Joi.string().min(0).max(20).allow("").allow(null),
});

module.exports = memoryBooksJoiSchema;
