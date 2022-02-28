/**
 * Create car_images table
 *
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('car_images', (table) => {
    table.increments('id').primary().unsigned();
    table.integer('car_id').references('id').inTable('cars').notNull();
    table.string('image_url', 500).notNull();
    table.timestamp('created_at').default(knex.fn.now()).notNull();
  });
}

/**
 * Drop table car_images
 *
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('car_images');
}
