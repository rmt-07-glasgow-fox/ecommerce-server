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
        notEmpty: true
      }
    },
    status: DataTypes.BOOLEAN,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Banner',
    hooks: {
      beforeCreate(banner, option) {
        banner.status = true
      }
    }
  });
  return Banner;
};