const knex = require('knex');
const { env } = require('../config');

const configOptions = require('../knexfile');

module.exports = knex(configOptions[env]);
