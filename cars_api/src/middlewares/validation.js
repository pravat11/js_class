import Joi from 'joi';

export function validateBody(schema) {
  return function (req, res, next) {
    try {
      Joi.assert(req.body, schema);

      next();
    } catch (err) {
      next(err);
    }
  };
}

export function validateQueryParams(schema) {
  return function (req, res, next) {
    try {
      Joi.assert(req.query, schema);

      next();
    } catch (err) {
      next(err);
    }
  };
}
