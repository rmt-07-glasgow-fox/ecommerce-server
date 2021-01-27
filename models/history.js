'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
    }
  };
  History.init({
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'field user id is required'
        }
      }
    },
    productName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'field product name is required'
        }
      }
    },
    productImage: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'field product image is required'
        }
      }
    },
    productPrice: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'field product price is required'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'field quantity is required'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'field category is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};