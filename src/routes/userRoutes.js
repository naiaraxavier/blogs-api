const express = require('express');
const { usersController } = require('../controllers');
const { validateUserFields } = require('../middlewares/checkUser');

const route = express.Router();

route.post('/', validateUserFields, usersController.create);

module.exports = route;