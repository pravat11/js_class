import diskDb from 'diskdb';

/**
 * Model for the 'cars' file.
 *
 * @class Car
 */
class Car {
  constructor() {
    this.filename = 'cars';
    this.db = diskDb.connect('src/db', [this.filename]);
  }

  getAll() {
    return this.db[this.filename].find();
  }

  getById(id) {
    return this.db[this.filename].findOne({ _id: id });
  }

  findByParams(params) {
    return this.db[this.filename].findOne(params);
  }

  save(data) {
    return this.db[this.filename].save(data);
  }

  updateById(id, data) {
    return this.db[this.filename].update({ _id: id }, data);
  }

  removeById(id) {
    return this.db[this.filename].remove({ _id: id });
  }
}

export default Car;
