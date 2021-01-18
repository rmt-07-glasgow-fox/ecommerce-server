'use strict';
const { Model } = require('sequelize');
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
  }
  Banner.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Title is required' },
          notEmpty: { args: true, msg: 'Title is required' },
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Status is required' },
          notEmpty: { args: true, msg: 'Status is required' },
        },
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Image url is required' },
          notEmpty: { args: true, msg: 'Umage url is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Banner',
    }
  );
  return Banner;
};
