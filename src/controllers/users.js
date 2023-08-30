const { usersService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');
const { getUserIdFromToken } = require('../utils/token');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, status } = await usersService.login(email, password);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { status, data } = await usersService.create(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAll = async (req, res) => {
try {
  const { status, data } = await usersService.getAll();
  res.status(mapStatusHTTP(status)).json(data);
} catch (err) {
  res.status(500).json({ error: err.message });
}
};

const getById = async (req, res) => {
  try {
    const { status, data } = await usersService.getById(Number(req.params.id));
    console.log(data);
    res.status(mapStatusHTTP(status)).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const userId = getUserIdFromToken(token);
  await usersService.remove(userId);
  res.status(204).end();
};

module.exports = {
  login,
  create,
  getAll,
  getById,
  remove,
};