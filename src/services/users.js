const jwt = require('jsonwebtoken');
const { User } = require('../models');

const unauthenticatedMessage = 'Invalid fields';
const unauthenticatedReturn = { 
  status: 'UNAUTHENTICATED', 
  data: { message: unauthenticatedMessage }, 
};

const generateToken = (user) => {
  const jwtPayload = {
    sub: user.id,
    name: user.displayName,
    role: 'user',
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '30m',
  });

  return token;
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return unauthenticatedReturn;
  if (user.password !== password) return unauthenticatedReturn;

  const token = generateToken(user);

  return {
    status: 'SUCCESSFUL',
    data: { token },
  };
};

const create = async (user) => {
  const { email } = user;
  const hasEmail = await User.findOne({ where: { email } });
  if (hasEmail) return { status: 'CONFLICT', data: { message: 'User already registered' } };

  await User.create(user);
  const token = generateToken(user);

  return { status: 'CREATED', data: { token } };
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  if (!users || users.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  return { status: 'SUCCESSFUL', data: users };
};

module.exports = {
  login,
  create,
  getAll,
};