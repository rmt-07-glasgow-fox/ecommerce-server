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
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Banner title is required'
        }
      }
    },
    status: DataTypes.STRING,
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Image url is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Banner',
    hooks: {
      beforeCreate: (instance, options) => {
        if (!instance.status) {
          instance.status = 'active'
        }
      }
    }
  });
  return Banner;
};