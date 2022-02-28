/**
 * Create manufacturers table.
 *
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('manufacturers', (table) => {
    table.increments('id').primary().unsigned();
    table.string('name', 20).notNull();
    table.string('description', 100);
  });
}

/**
 * Drop manufacturers table.
 *
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('manufacturers');
}
