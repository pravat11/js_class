import DBModel from './DBModel.js';
import getAllCarsQuery from '../db/queries/getAllCars.js';
import getCarDetailsQuery from '../db/queries/getCarDetail.js';

/**
 * Model for the 'cars' file.
 *
 * @class Car
 */
class Car extends DBModel {
  constructor() {
    super('cars');
  }

  getAllCars() {
    return this.query(getAllCarsQuery);
  }

  async getCarDetails(carId) {
    const [details] = await this.query(getCarDetailsQuery, { carId });

    return details || null;
  }
}

export default Car;
