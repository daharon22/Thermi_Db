/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('devices', (table) =>
    {
      table.double('maxTemp1');
      table.double('maxTemp2');
    }
    )
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropColumn('maxTemp1').dropColumn('maxTemp2');
  
};
