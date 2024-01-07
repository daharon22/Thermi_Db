/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('users', (table) =>
  {
    table.string('token');
    table.timestamp('token_expiration_time');
  }
  )
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropColumn('token').dropColumn('token_expiration_time');
  
};
