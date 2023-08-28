const { usersService } = require('../services');

const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, status } = await usersService.login(email, password);

  if (status === 'UNAUTHENTICATED') return res.status(400).json(data);
  
  return res.status(200).json(data);
};

module.exports = {
  login,
};