const config = require('./config/default');
const test = require('./config/env/test');
const production = require('./config/env/production');

config.$env_test = test;
config.$env_production = production;

module.exports = config;
