import Car from '../models/Car.js';
import logger from '../utils/logger.js';

/**
 * Get all cars.
 *
 * @return
 */
export function getAllCars(query) {
  const manufacturerFilter = query.manufacturer ? query.manufacturer.split(',') : [];
  const modelFilter = query.model ? query.model.split(',') : [];

  logger.info('Fetching a list of all cars');

  const cars = new Car().getAll();

  let filteredCars = cars;

  if (manufacturerFilter.length) {
    filteredCars = cars.filter((car) => manufacturerFilter.includes(car.manufacturer));
  }

  if (modelFilter.length) {
    filteredCars = cars.filter((car) => modelFilter.includes(car.model));
  }

  return {
    data: filteredCars,
    message: 'List of cars',
  };
}

/**
 * Get a specific car details by id.
 *
 * @param {string} id
 * @returns {object}
 */
export function getCar(id) {
  logger.info(`Fetching car with carId ${id}`);

  const car = new Car().getById(id);

  if (!car) {
    logger.error(`Cannot find car with carId ${id}`);

    throw new Error(`Cannot find car with carId ${id}`);
  }

  return {
    data: car,
    message: `Details of carId ${id}`,
  };
}

export function addCar(params) {
  logger.debug('Payload received', params);

  const onlyRequiredParams = {
    manufacturer: params.manufacturer,
    model: params.model,
  };

  const existingData = new Car().findByParams(onlyRequiredParams);

  if (existingData) {
    logger.error('Data with the same payload already exists');

    throw new Error('Data with the same payload already exists');
  }

  logger.info('Saving the new car data');

  const data = new Car().save(onlyRequiredParams);

  return {
    data,
    message: 'Added the record successfully',
  };
}

export function updateCar(id, params) {
  logger.info(`Checking the existence of car with id ${id}`);

  const car = new Car().getById(id);

  if (!car) {
    logger.error(`Cannot find car with id ${id}`);

    throw new Error(`Cannot find car with id ${id}`);
  }

  logger.info(`Updating the data for car id ${id}`);

  new Car().updateById(id, params);

  logger.info(`Fetching the updated data for car id ${id}`);

  const updatedData = new Car().getById(id);

  return {
    data: updatedData,
    message: 'Record updated successfully',
  };
}

export function removeCar(id) {
  logger.info(`Checking if car with id ${id} exists`);

  const car = new Car().getById(id);

  if (!car) {
    logger.error(`Cannot delete car with id ${id} because it doesn't exist`);

    throw new Error(`Cannot delete car with id ${id} because it doesn't exist`);
  }

  new Car().removeById(id);

  return {
    message: 'Record removed successfully',
  };
}
