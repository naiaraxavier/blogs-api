const { categorySchema } = require('./validations/schemas');

const validateCategoryFields = (req, res, next) => {
  const { body } = req;
  const { error } = categorySchema.validate(body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = {
  validateCategoryFields,
};