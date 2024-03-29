const express = require('express');
const authMiddleware = require('../middlewares/authentication');
const { categoriesController } = require('../controllers');
const { validateCategoryFields } = require('../middlewares/checkCategory');

const route = express.Router();

route.post('/', authMiddleware, validateCategoryFields, categoriesController.create);

route.get('/', authMiddleware, categoriesController.getAll);

module.exports = route;