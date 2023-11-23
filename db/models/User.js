const appRoot = require('app-root-path');
const environment = process.env.NODE_ENV || 'development'
const knexConfig = appRoot.require('db/knexfile');
const Knex = require('knex')(knexConfig[environment]);
const { Model } = require('objection');
Model.knex(Knex);

class User extends Model{
    static get tableName()
    {
        return 'users';
    }
}

module.exports = User;
