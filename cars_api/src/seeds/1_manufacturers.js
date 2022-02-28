/**
 * Delete existing entries and seed values for `manufacturers`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('manufacturers')
    .del()
    .then(() => {
      return knex('manufacturers').insert([
        {
          name: 'Hyundai',
          description: 'Description data for Hyundai'
        },
        {
          name: 'Suzuki',
          description: 'Description data for Suzuki'
        },
        {
          name: 'Tata',
          description: 'Description data for Tata'
        }
      ]);
    });
}
