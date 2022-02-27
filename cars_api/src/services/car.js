import Boom from '@hapi/boom';

import Car from '../models/Car.js';
import logger from '../utils/logger.js';
import CarImage from '../models/CarImage.js';

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

  const [carTableInsertedData] = await new Car().save(carTableInsertParams);

  if (params.images.length) {
    logger.info('Creating insert data for car_images table');
    const carImagesInsertData = params.images.map((url) => ({
      carId: carTableInsertedData.id,
      imageUrl: url
    }));

    logger.info(`Inserting ${carImagesInsertData.length} records into the car_images table`);
    carImagesInsertData.forEach(async (insertData) => {
      await new CarImage().save(insertData);
    });
  }

  logger.info('Retreiving the saved car details');
  const data = await new Car().getCarDetails(carTableInsertedData.id);

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
export async function updateCar(id, params) {
  logger.info(`Checking the existence of car with id ${id}`);

  const car = await new Car().getById(id);

  if (!car) {
    logger.error(`Cannot find car with id ${id}`);

    throw new Boom.notFound(`Cannot find car with id ${id}`);
  }

  logger.info(`Updating the data for car id ${id}`);

  await new Car().updateById(id, {
    manufacturerId: params.manufacturerId,
    model: params.model,
    horsepower: params.horsepower
  });

  // If we want to deal with images, we have two approaches:
  // 1. Using the same update endpoint for car images as well -> Appropriate handler
  // 2. Using a separate endpoint(API) altogether

  if (params.images?.added?.length) {
    params.images.added.forEach(async (url) => {
      await new CarImage().save({ id, imageUrl: url });
    });
  }

  if (params.images?.removed?.length) {
    params.images.removed.forEach(async (url) => {
      await new CarImage().removeByParams({ id, imageUrl: url });
    });
  }

  logger.info(`Fetching the updated data for car id ${id}`);

  const updatedData = await new Car().getCarDetails(id);

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
export async function removeCar(id) {
  logger.info(`Checking if car with id ${id} exists`);

  const car = await new Car().getById(id);

  if (!car) {
    logger.error(`Cannot delete car with id ${id} because it doesn't exist`);

    throw new Boom.notFound(`Cannot delete car with id ${id} because it doesn't exist`);
  }

  await new CarImage().removeByParams({ carId: id });
  await new Car().removeById(id);

  return {
    message: 'Record removed successfully'
  };
}

// GET /cars/1 => Get details of carId 1

// GET /cars/1/images => Get only the images of carId 1

// GET /cars/1/images/2 => Get image 2 of carId 1

// PUT /cars/1 => Only the data required to update cars => manufacturerId, model, horsepower

// DELETE /cars/1/images/2 => Delete image 2 for carId 1
// POST /cars/1/images => Add new image
