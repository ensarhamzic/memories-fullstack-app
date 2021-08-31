const Joi = require("joi");

const usersJoiSchema = Joi.object({
  fullName: Joi.string().alphanum().required().max(30),
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).max(20),
  password: Joi.string().min(5).required(),
});

module.exports = usersJoiSchema;
