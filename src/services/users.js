const { User } = require('../models');
const { generateToken } = require('../utils/token');

const unauthenticatedMessage = 'Invalid fields';
const unauthenticatedReturn = { 
  status: 'UNAUTHENTICATED', 
  data: { message: unauthenticatedMessage }, 
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
    return { status: 'NOT_FOUND', data: { message: 'Users not found' } };
  }

  return { status: 'SUCCESSFUL', data: users };
};

const getById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  if (!user || user.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
  }
  return { status: 'SUCCESSFUL', data: user };
}; 

const remove = async (id) => {
  const removed = await User.destroy({ where: { id } });
  return removed;
};

module.exports = { login, create, getAll, getById, remove };