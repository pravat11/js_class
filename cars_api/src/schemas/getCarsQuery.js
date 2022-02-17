import Joi from 'joi';

const schema = Joi.object({
  manufacturer: Joi.string(),
  model: Joi.string(),
});

export default schema;
