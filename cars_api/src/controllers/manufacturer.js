import * as manufacturerService from '../services/manufacturer.js';

/**
 * Controller to get a list of all car manufacturers.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function getManufacturers(req, res, next) {
  manufacturerService
    .getManufacturers()
    .then((data) => res.json(data))
    .catch((err) => next(err));
}
