'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    static associate(models) {
      Banner.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  };
  Banner.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title is required"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          args: true,
          msg: "Status is required"
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "ImageUrl is required"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "UserId is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};