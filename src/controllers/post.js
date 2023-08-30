const { postService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');
const { getUserIdFromToken } = require('../utils/token');

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

const getById = async (req, res) => {
  try {
    const { status, data } = await postService.getById(Number(req.params.id));
    console.log(data);
    res.status(mapStatusHTTP(status)).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { removed, blogid } = await postService.remove(id);
  console.log(blogid);
  if (!removed) return res.status(404).json({ message: 'Post does not exist' });

  const token = req.headers.authorization.split(' ')[1];
  const userId = getUserIdFromToken(token);
  if (!userId || userId !== blogid.dataValues.userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  res.status(204).end();
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
};