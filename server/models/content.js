'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    static associate(models) {
      this.hasMany(models.Wishlist, {foreignKey: 'ContentId', targetKey: 'id'})
      this.belongsToMany(models.User, {through: models.Wishlist, foreignKey: 'ContentId'})
      this.hasMany(models.Cart, {foreignKey: 'ContentId', targetKey: 'id'})
      this.belongsToMany(models.User, {through: models.Cart, foreignKey: 'ContentId'})
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
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description is required"
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
     tags: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Tags is required"
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
    }
  }, {
    sequelize,
    modelName: 'Content',
  });
  return Content;
};