const { usersService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, status } = await usersService.login(email, password);

  if (status === 'UNAUTHENTICATED') return res.status(400).json(data);
  
  return res.status(200).json(data);
};

const create = async (req, res) => {
  try {
    const { status, data } = await usersService.create(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  login,
  create,
};