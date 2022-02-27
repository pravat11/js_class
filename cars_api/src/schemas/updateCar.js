import Joi from 'joi';

const schema = Joi.object({
  manufacturerId: Joi.number().integer().optional(),
  model: Joi.string().max(20).optional(),
  horsepower: Joi.number().integer().min(1000).optional(),
  images: Joi.object({
    added: Joi.array().items(Joi.string()).optional(),
    removed: Joi.array().items(Joi.string()).optional()
  }).optional()
});

export default schema;
