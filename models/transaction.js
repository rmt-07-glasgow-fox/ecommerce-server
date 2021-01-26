'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User)
    }
  };
  Transaction.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'name is required'
        },
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        isNumeric : {
          args : true,
          msg : `allow for number only`
        },
        min : {
          args : [0],
          msg : `price / stock can't be negative`
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        isNumeric : {
          args : true,
          msg : `allow for number only`
        },
        min : {
          args : [0],
          msg : `price / stock can't be negative`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};