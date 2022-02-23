import DBModel from '../db/DBModel';

/**
 * Model for the 'manufacturers' table.
 *
 * @class Manufacturer
 */
class Manufacturer extends DBModel {
  constructor() {
    super('manufacturers');
  }

  demo() {
    this.connection.raw('SELECT * FROM manufacturers');
  }
}

export default Manufacturer;
