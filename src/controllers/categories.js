const { categoriesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const create = async (req, res) => {
  try {
    const { status, data } = await categoriesService.create(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const { status, data } = await categoriesService.getAll();
    res.status(mapStatusHTTP(status)).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  create,
  getAll,
};