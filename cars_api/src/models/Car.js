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

  // Using Knex query builder
  // getCars() {
  //   const data = await this.connection
  //     .queryBuilder()
  //     .select(['c.id', 'c.manufacturer_id', 'm.name AS manufacturer_name', 'STRING_AGG(ci.image_url, ',') AS images'])
  //     .from('cars AS c')
  //     .innerJoin('manufacturers AS m', 'm.id', 'c.manufacturer_id')
  //     .leftJoin('car_images AS ci', 'ci.car_id', 'c.id')
  //     .groupBy('c.id', 'c.manufacturer_id', 'm.name', 'c.model', 'c.horsepower', 'c.created_at');
  // }

  async getCarDetails(carId) {
    const [details] = await this.query(getCarDetailsQuery, { carId });

    return details || null;
  }
}

export default Car;
