const jwt = require('jsonwebtoken');
const { BlogPost, Category, PostCategory, User } = require('../models');

const getUserIdFromToken = (authToken) => {
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    return decoded.sub;
  } catch (err) {
    return err.message;
  }
};

const unauthenticatedMessage = 'one or more "categoryIds" not found';
const unauthenticatedReturn = { 
  status: 'UNAUTHENTICATED', 
  data: { message: unauthenticatedMessage }, 
};

const create = async (post, token) => {
  const { title, content, categoryIds } = post;
  const userId = getUserIdFromToken(token);

  const hasCategory = categoryIds.map((categoryId) => Category.findByPk(categoryId));
  const categories = await Promise.all(hasCategory);
  if (categories.some((isnull) => isnull === null)) {
    return unauthenticatedReturn;
  }

  const createdPost = await BlogPost.create({
    title, content, userId, published: new Date(), updated: new Date(),
  });

  categoryIds.forEach(async (id) => {
    await PostCategory.create({
      postId: createdPost.id, categoryId: id,
    });
  });
  return { status: 'CREATED', data: createdPost };
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!posts || posts.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Posts not found' } };
  }

  return { status: 'SUCCESSFUL', data: posts };
};

module.exports = {
  create,
  getAll,
};