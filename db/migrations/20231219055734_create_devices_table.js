/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('devices', (table) =>
    {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('serial_number');
      table.string('mac_address');
      table.string('last_seen');
      table.string('firmware_version');
      table.string('model');
      table.string('token').unique;
      table.integer('owner_id').references("users.id");
      table.timestamps();
    }
    )
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('devices');
  
};
