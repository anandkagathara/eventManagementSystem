
const Joi = require("joi");
const User = require("../models/user.model");

const authValidator = (userData) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(userData);
  if (error) {
    const errorMessage = error.details[0].message;
    const statusCode = 400; // Bad Request
    throw { statusCode, message: errorMessage };
  }
};


module.exports = {
    authValidator
  };