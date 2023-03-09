const Joi = require("joi");
const User = require("../models/user.model");

const updateUserValidator = (userData) => {
  const schema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    dateOfBirth: Joi.date().optional(),
    gender: Joi.string().valid("Male", "Female", "Other").optional(),
    profilePhotoUrl: Joi.string().optional().allow(null),
  });

  const { error } = schema.validate(userData);
  if (error) {
    const errorMessage = error.details[0].message;
    const statusCode = 400; // Bad Request
    throw { statusCode, message: errorMessage };
  }
};

module.exports = {
    updateUserValidator
  };