/**
 * Create cars table
 *
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('cars', (table) => {
    table.increments('id').primary().unsigned();
    table.integer('manufacturer_id').references('id').inTable('manufacturers').notNull();
    table.string('model', 20).unique().notNull();
    table.integer('horsepower').default(1000).notNull();
    table.timestamp('created_at').default(knex.fn.now()).notNull();
  });
}

/**
 * Drop table cars
 *
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('cars');
}
