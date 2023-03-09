const Joi = require("joi");

const creaateeventValidator = (eventData) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    eventDate: Joi.date().required(),
    eventTime: Joi.string().required(),
    place: Joi.string().required(),
    creator: Joi.string().required().optional(),
    participants: Joi.array().items(Joi.string()).optional(),
    maxParticipants: Joi.number().default(10).optional(),
  });

  const { error } = schema.validate(eventData);
  if (error) {
    const errorMessage = error.details[0].message;
    const statusCode = 400; // Bad Request
    throw { statusCode, message: errorMessage };
  }
};

const joinleaveEventValidator = (eventData) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
  });

  const { error } = schema.validate(eventData);
  if (error) {
    const errorMessage = error.details[0].message;
    const statusCode = 400; // Bad Request
    throw { statusCode, message: errorMessage };
  }
};

module.exports = {
  creaateeventValidator,
  joinleaveEventValidator,
};
