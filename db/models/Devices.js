const appRoot = require('app-root-path');
const environment = process.env.NODE_ENV || 'development'
const knexConfig = appRoot.require('db/knexfile');
const Knex = require('knex')(knexConfig[environment]);
const { Model } = require('objection');
Model.knex(Knex);

class Devices extends Model{
    static get tableName()
    {
        return 'devices';
    }
}

module.exports = Devices;
