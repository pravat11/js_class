import * as carService from '../services/car.js';

/**
 * Controller to get details of all cars.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function getCars(req, res, next) {
  carService
    .getAllCars(req.query)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

/**
 * Controller to get details of a car.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function getCar(req, res, next) {
  carService
    .getCar(+req.params.carIdentifier)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

/**
 * Controller to get add new car record.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function saveCar(req, res, next) {
  carService
    .addCar(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

/**
 * Controller to get update the details of a car.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function updateCar(req, res, next) {
  const id = req.params.carIdentifier;
  const body = req.body;

  try {
    const data = carService.updateCar(id, body);

    res.json(data);
  } catch (err) {
    next(err);
  }
}

/**
 * Controller to get remove a car record.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function removeCar(req, res, next) {
  try {
    const data = carService.removeCar(req.params.carIdentifier);

    res.json(data);
  } catch (err) {
    next(err);
  }
}
