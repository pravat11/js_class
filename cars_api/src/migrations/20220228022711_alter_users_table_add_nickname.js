/**
 * Add nickname column to the users table.
 *
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.string('nickname', 50);
  });
}

/**
 * Drop column nickname from users table
 *
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('nickname');
  });
}
