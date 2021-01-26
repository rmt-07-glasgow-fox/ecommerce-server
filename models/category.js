'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Product)
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Category Name is Required`
        }
      }
    },
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });

  Category.beforeCreate((category, opt) => {
    if (!category.image || category.image.trim == '') {
      category.image = 'folder-open'
    }
  })

  return Category;
};