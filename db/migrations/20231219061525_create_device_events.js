/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('device_events', (table) =>
    {
      table.increments('id').primary();
      table.double('temperature_t1');
      table.double('temperature_t2');
      table.double('temperature_t3');
      table.integer("device_id").references("devices.id");
      table.timestamp('event_time');
      table.string('event_type');
      table.timestamps();
    }
    )
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('device_events');
  
};
