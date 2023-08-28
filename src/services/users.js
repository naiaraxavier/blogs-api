const jwt = require('jsonwebtoken');
const { User } = require('../models');

const unauthenticatedMessage = 'Invalid fields';
const unauthenticatedReturn = { 
  status: 'UNAUTHENTICATED', 
  data: { message: unauthenticatedMessage }, 
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return unauthenticatedReturn;
  if (user.password !== password) return unauthenticatedReturn;

  const jwtPayload = {
    sub: user.id,
    name: user.displayName,
    role: 'user',
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '30m',
  });

  return {
    status: 'SUCCESS',
    data: { token },
  };
};

const create = async (user) => {
  const hasEmail = await User.findOne({ where: { email: user.email } });
  if (hasEmail) return { status: 'CONFLICT', data: { message: 'User already registered' } };
  await User.create(user);

  const jwtPayload = {
    sub: user.id,
    name: user.displayName,
    role: 'user',
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '30m',
  });
  return { status: 'CREATED', data: { token } };
};

module.exports = {
  login,
  create,
};