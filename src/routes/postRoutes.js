const express = require('express');
const authMiddleware = require('../middlewares/authentication');
const { postController } = require('../controllers');
const { validatePostFields } = require('../middlewares/checkPost');

const route = express.Router();

route.post('/', authMiddleware, validatePostFields, postController.create);

route.get('/', authMiddleware, postController.getAll);

route.get('/:id', authMiddleware, postController.getById);

route.delete('/:id', authMiddleware, postController.remove);

module.exports = route;