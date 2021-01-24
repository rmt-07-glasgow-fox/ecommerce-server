'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    static associate(models) {
      Content.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  };
  Content.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required"
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Category is required"
        }
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price is required"
        },
        min: 0
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Stock is required"
        },
        min: 0
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
    modelName: 'Content',
  });
  return Content;
};