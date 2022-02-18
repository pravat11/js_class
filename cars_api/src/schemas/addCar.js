import Joi from 'joi';

const schema = Joi.object({
  manufacturer: Joi.string().max(20).required(),
  model: Joi.string().max(20).required(),
  horsepower: Joi.number().integer().required()
});

export default schema;
