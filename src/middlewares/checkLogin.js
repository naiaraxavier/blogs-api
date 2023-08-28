// const { loginSchema } = require('./validations/schemas');

// const validateLoginFields = (req, res, next) => {
//   const { body } = req;
//   const { error } = loginSchema.validate(body);
//   if (error) {
//     return res.status(400).json({ message: error.message });
//   }
//   next();
// };

const validateLoginFields = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = {
  validateLoginFields,
};