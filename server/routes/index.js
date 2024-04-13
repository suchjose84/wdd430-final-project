const routes = require('express').Router();
const users = require('./users');

routes.use('/api', users);


module.exports = routes;
