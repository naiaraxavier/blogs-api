const { postService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const create = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const { status, data } = await postService.create(req.body, token);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const { status, data } = await postService.getAll();
    res.status(mapStatusHTTP(status)).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  };

module.exports = {
  create,
  getAll,
};