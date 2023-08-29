const express = require('express');
const { usersController } = require('../controllers');
const { validateUserFields } = require('../middlewares/checkUser');
const authMiddleware = require('../middlewares/authentication');

const route = express.Router();

route.post('/', validateUserFields, usersController.create);

route.get('/', authMiddleware, usersController.getAll);

module.exports = route;