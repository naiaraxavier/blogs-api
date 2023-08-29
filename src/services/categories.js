const { Category } = require('../models');

const create = async (category) => {
  const { name } = category;
  const hasCategory = await Category.findOne({ where: { name } });
  if (hasCategory) return { status: 'CONFLICT', data: { message: 'Category already registered' } };

  const data = await Category.create(category);

  return { status: 'CREATED', data };
};

const getAll = async () => {
  const categories = await Category.findAll();
  if (!categories || categories.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Categories not found' } };
  }

  return { status: 'SUCCESSFUL', data: categories };
};

module.exports = {
  create,
  getAll,
};