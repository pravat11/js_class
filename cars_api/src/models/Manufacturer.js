import DBModel from './DBModel.js';

/**
 * Model for the 'manufacturers' table.
 *
 * @class Manufacturer
 */
class Manufacturer extends DBModel {
  constructor() {
    super('manufacturers');
  }
}

export default Manufacturer;
