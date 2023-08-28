const express = require('express');
const { usersController } = require('../controllers');
const { validateLoginFields } = require('../middlewares/checkLogin');

const route = express.Router();

route.post('/', validateLoginFields, usersController.login);

module.exports = route;