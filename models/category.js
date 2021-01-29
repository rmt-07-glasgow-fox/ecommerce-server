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
      Category.belongsTo(models.User);
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Category name already created' },
      validate: {
        notNull: {
          msg: "Category name is required",
        },
        notEmpty: {
          msg: "Category name is required",
        },
      },
    },
    UserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};