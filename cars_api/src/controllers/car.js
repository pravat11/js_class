import * as carService from '../services/car.js';

/**
 * Controller to get details of all cars.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function getCars(req, res, next) {
  try {
    const data = carService.getAllCars(req.query);

    res.json(data);
  } catch (err) {
    next(err);
  }
}

/**
 * Controller to get details of a car.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function getCar(req, res, next) {
  const id = req.params.carIdentifier;

  try {
    const data = carService.getCar(id);

    res.json(data);
  } catch (err) {
    next(err);
  }
}

/**
 * Controller to get add new car record.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function saveCar(req, res, next) {
  try {
    const data = carService.addCar(req.body);

    res.json(data);
  } catch (err) {
    next(err);
  }
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
