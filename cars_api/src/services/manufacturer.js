import logger from '../utils/logger.js';
import Manufacturer from '../models/Manufacturer.js';

/**
 * Get list of manufacturers
 *
 * @return {Object}
 */
export async function getManufacturers() {
  logger.info('Fetching list of manufacturers');

  const data = await new Manufacturer().getAll();

  return {
    data,
    message: 'List of manufacturers'
  };
}
