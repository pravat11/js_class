import DBModel from '../db/DBModel';

/**
 * Model for the 'cars' file.
 *
 * @class Car
 */
class Car extends DBModel {
  constructor() {
    super('cars');
  }

  getCarDetails() {
    const data = this.connection.raw(`
      SELECT c.id, m.name, c.model, c.created_at
      FROM cars c
      INNER JOIN manufacturers m ON m.id = c.manufacturer_id
    `);

    return data;
  }
}

export default Car;
