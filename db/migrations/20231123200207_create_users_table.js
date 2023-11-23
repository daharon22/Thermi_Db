/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) =>
  {
    table.increments('id').primary();
    table.string('userid').notNullable().unique();
    table.string('password');
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.timestamp('last_login');
    table.timestamp('activated');
    table.boolean('is_suspended');
    table.boolean('is_disabled');
    table.integer('failed_login_counts');
    table.boolean('is_active');
    table.string('verification_code').unique();
    table.string('last_login_ip');
    table.timestamps();
  }
  )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
