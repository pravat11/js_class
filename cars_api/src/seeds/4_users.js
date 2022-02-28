/**
 * Delete existing entries and seed values for `users`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert([
        {
          name: 'Prabhat Gautam',
          email: 'some.email@domain.com',
          password: '$2b$10$uir5P54aydy5u7rkuKJFp.tcyS0AK4JXT.2HRKYA/pUqIsWYSFHgy',
          nickname: 'PG'
        }
      ]);
    });
}
