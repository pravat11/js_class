import bcrypt from 'bcrypt';
import Boom from '@hapi/boom';

import User from '../models/User.js';
import logger from '../utils/logger.js';

/**
 * Create a new user.
 *
 * @param {Object} params
 * @return {Object}
 */
export async function createUser(params) {
  const { name, email, password } = params;

  const existingUser = await new User().findByParams({ email });

  if (existingUser) {
    logger.error('The email address is already taken');

    throw new Boom.badRequest('The email address is already taken');
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const [insertedData] = await new User().save({ name, email, password: hashedPassword });

  return {
    data: insertedData,
    message: 'Added user successfully'
  };
}
