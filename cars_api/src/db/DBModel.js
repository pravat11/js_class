import camelize from 'camelize';
import snakeize from 'snakeize';

import connection from '../knexfile.js';

/**
 * Base model for that can be used for all tables.
 *
 * @class DBModel
 */
class DBModel {
  constructor(table) {
    this.table = table;
    this.connection = connection;
  }

  async getAll() {
    const data = await this.connection(this.table).select('*');

    return camelize(data);
  }

  async getById(id) {
    const data = await this.connection(this.table).select('*').where('id', id);

    return camelize(data);
  }

  async findByParams(params) {
    const data = await this.connection(this.table).select('*').where(snakeize(params));

    return camelize(data);
  }

  async save(data) {
    const result = await this.connection(this.table).insert(snakeize(data)).returning('*');

    return camelize(result);
  }

  async updateById(id, data) {
    const result = await this.connection(this.table).update(snakeize(data)).where({ id }).returning('*');

    return camelize(result);
  }

  async removeById(id) {
    const result = await this.connection(this.table).delete().where({ id });

    return camelize(result);
  }
}

export default DBModel;