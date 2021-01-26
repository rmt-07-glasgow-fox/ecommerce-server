'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Product, { 
        foreignKey: 'userId', 
        through: 'Cart',
        as: 'itemoncart'
      }),
      User.belongsToMany(models.Product, { 
        foreignKey: 'userId', 
        through: 'Wishlist',
        as: 'itemonwishlist'
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        isEmail: {
          args: true,
          msg: "invalid email format"
        },
        notEmpty: {
          args: true,
          msg: "please fill the email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill the password"
        },
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
        user.role = "costumer"
      }
    }
  });
  return User;
};