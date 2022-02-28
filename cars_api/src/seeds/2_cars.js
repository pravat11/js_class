/**
 * Delete existing entries and seed values for `cars`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('cars')
    .del()
    .then(() => {
      return knex('cars').insert([
        {
          manufacturer_id: 1,
          model: 'i10',
          horsepower: 1100
        },
        {
          manufacturer_id: 1,
          model: 'i20',
          horsepower: 1200
        },
        {
          manufacturer_id: 2,
          model: 'Brezza',
          horsepower: 1400
        },
        {
          manufacturer_id: 3,
          model: 'Tiago',
          horsepower: 1050
        }
      ]);
    });
}
