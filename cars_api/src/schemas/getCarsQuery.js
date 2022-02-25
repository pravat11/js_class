import Joi from 'joi';

const schema = Joi.object({
  manufacturerId: Joi.number().integer(),
  model: Joi.string()
});

export default schema;
