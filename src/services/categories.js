const { Category } = require('../models');

const create = async (category) => {
  const { name } = category;
  const hasCategory = await Category.findOne({ where: { name } });
  if (hasCategory) return { status: 'CONFLICT', data: { message: 'Category already registered' } };

  const data = await Category.create(category);

  return { status: 'CREATED', data };
};

module.exports = {
  create,
};