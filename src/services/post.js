const { BlogPost, Category, PostCategory, User } = require('../models');
const { getUserIdFromToken } = require('../utils/token');

const unauthenticatedReturn = { 
  status: 'UNAUTHENTICATED', 
  data: { message: 'one or more "categoryIds" not found' }, 
};
const notFoundReturn = { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };

const create = async (post, token) => {
  const { title, content, categoryIds } = post;
  const userId = getUserIdFromToken(token);
  const hasCategory = await Promise.all(categoryIds
    .map((categoryId) => Category.findByPk(categoryId)));
  if (hasCategory.some((category) => category === null)) return unauthenticatedReturn;
  const createdPost = await BlogPost.create({
    title, content, userId, published: new Date(), updated: new Date() });
  await Promise.all(categoryIds.map((id) => PostCategory.create({
    postId: createdPost.id, categoryId: id })));
  return { status: 'CREATED', data: createdPost };
};

const getPostsInclude = [
  { model: User, as: 'user', attributes: { exclude: ['password'] } },
  { model: Category, as: 'categories', through: { attributes: [] } },
];

const getAll = async () => {
  const posts = await BlogPost.findAll({ include: getPostsInclude });
  return posts || posts.length > 0 ? { status: 'SUCCESSFUL', data: posts } : notFoundReturn;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({ where: { id }, include: getPostsInclude });
  return post || post.length > 0 ? { status: 'SUCCESSFUL', data: post } : notFoundReturn;
};

const remove = async (id) => {
  const blogid = await BlogPost.findByPk(id, { include: [{ model: User, as: 'user' }] });
  const removed = await BlogPost.destroy({ where: { id } });
  return { removed, blogid };
};

module.exports = {
  create, getAll, getById, remove,
};