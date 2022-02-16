import Joi from 'joi';

import addCarSchema from '../schemas/addCar.js';

function validation(req, res, next) {
  try {
    Joi.assert(req.body, addCarSchema);

    next();
  } catch (err) {
    res.status(400).json({
      message: 'Validation error',
      details: err.details.map((e) => e.message),
    });
  }
}

export default validation;
