const express = require('express');
const authMiddleware = require('../middlewares/authentication');
const { postController } = require('../controllers');
const { validatePostFields } = require('../middlewares/checkPost');

const route = express.Router();

route.post('/', authMiddleware, validatePostFields, postController.create);

module.exports = route;