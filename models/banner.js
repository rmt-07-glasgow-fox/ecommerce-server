'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Banner.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input banner name'
        },
        len: {
          args: [5, 20],
          msg: 'Please input banner name between 5 to 20 characters'
        }
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input banner url'
        },
        isUrl: {
          msg: 'Please input in url format'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};