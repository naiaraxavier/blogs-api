module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'post_id',
      references: {
        model: 'blog_posts',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'category_id',
      references: {
        model: 'categories',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    timestamps: false,
    tableName: 'post_categories',
    underscored: true
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, { through: PostCategory, foreignKey: 'post_id', otherKey: 'category_id' })
    models.BlogPost.belongsToMany(models.Category, { through: PostCategory, foreignKey: 'post_id', otherKey: 'category_id' })
  }

  return PostCategory;
};