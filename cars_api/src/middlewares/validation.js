import Joi from 'joi';

export function validateBody(schema) {
  return function (req, res, next) {
    try {
      Joi.assert(req.body, schema);

      next();
    } catch (err) {
      res.status(400).json({
        message: 'Request body validation error',
        details: err.details.map((e) => e.message),
      });
    }
  };
}

export function validateQueryParams(schema) {
  return function (req, res, next) {
    try {
      Joi.assert(req.query, schema);

      next();
    } catch (err) {
      res.status(400).json({
        message: 'Query params validation error',
        details: err.details.map((e) => e.message),
      });
    }
  };
}
