import Boom from '@hapi/boom';

import Car from '../models/Car.js';
import logger from '../utils/logger.js';

/**
 * Get a list of all available cars.
 *
 * @param {Object} [query]
 * @return {Object}
 */
export async function getAllCars(query) {
  const manufacturerId = query.manufacturerId;
  const modelFilter = query.model ? query.model.split(',') : [];

  logger.info('Fetching a list of all cars');

  const cars = await new Car().getAllCars();

  const parsedCars = cars.map((car) => ({
    ...car,
    images: car.images ? car.images.split(',') : []
  }));

  let filteredCars = parsedCars;

  if (manufacturerId) {
    filteredCars = parsedCars.filter((car) => +manufacturerId === car.manufacturerId);
  }

  if (modelFilter.length) {
    filteredCars = parsedCars.filter((car) => modelFilter.includes(car.model));
  }

  return {
    data: filteredCars,
    message: 'List of cars'
  };
}

/**
 * Get details of a car by the identifier.
 *
 * @param {string} id
 * @return {Object}
 */
export async function getCar(id) {
  logger.info(`Fetching car with carId ${id}`);

  const car = await new Car().getCarDetails(id);

  if (!car) {
    logger.error(`Cannot find car with carId ${id}`);

    throw new Boom.notFound(`Cannot find car with carId ${id}`);
  }

  const parsedCar = {
    ...car,
    images: car.images ? car.images.split(',') : []
  };

  return {
    data: parsedCar,
    message: `Details of carId ${id}`
  };
}

/**
 * Create a new car record.
 *
 * @param {Object} params
 * @return {Object}
 */
export async function addCar(params) {
  logger.debug('Payload received', params);

  const carTableInsertParams = {
    manufacturerId: params.manufacturerId,
    model: params.model,
    horsepower: params.horsepower
  };

  logger.info('Checking if similar record already exists');

  const existingData = await new Car().findByParams(carTableInsertParams);

  if (existingData) {
    logger.error('Data with the same payload already exists');

    throw new Boom.badRequest('Data with the same payload already exists');
  }

  logger.info('Saving the new car data');

  const [data] = await new Car().save(carTableInsertParams);

  // if (params.images.length) {
  //   const carImagesInsertData = params.images.map((url) => ({
  //     carId: data.id,
  //     imageUrl: url
  //   }));

  //   const [imagesData] = await new
  // }

  return {
    data,
    message: 'Added the record successfully'
  };
}

/**
 * Update existing car record.
 *
 * @param {string} id
 * @param {Object} params
 * @return {Object}
 */
export function updateCar(id, params) {
  logger.info(`Checking the existence of car with id ${id}`);

  const car = new Car().getById(id);

  if (!car) {
    logger.error(`Cannot find car with id ${id}`);

    throw new Boom.notFound(`Cannot find car with id ${id}`);
  }

  logger.info(`Updating the data for car id ${id}`);

  new Car().updateById(id, params);

  logger.info(`Fetching the updated data for car id ${id}`);

  const updatedData = new Car().getById(id);

  return {
    data: updatedData,
    message: 'Record updated successfully'
  };
}

/**
 * Remove an existing record based on the identifier.
 *
 * @param {string} id
 * @return {Object}
 */
export function removeCar(id) {
  logger.info(`Checking if car with id ${id} exists`);

  const car = new Car().getById(id);

  if (!car) {
    logger.error(`Cannot delete car with id ${id} because it doesn't exist`);

    throw new Boom.notFound(`Cannot delete car with id ${id} because it doesn't exist`);
  }

  new Car().removeById(id);

  return {
    message: 'Record removed successfully'
  };
}
