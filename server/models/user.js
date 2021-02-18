'use strict';
const {
  Model
} = require('sequelize');
const { options } = require('../app');
const {
  getHashPassword
} = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Cart, { foreignKey: "UserId" })
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Username Should Not Be Null"
        },
        notEmpty: {
          args: true,
          msg: "Username Should Not Be Empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Email Should Not Be Null"
        },
        notEmpty: {
          args: true,
          msg: "Email Should Not Be Empty"
        },
        isEmail: {
          args: true,
          msg: "Please Input Your Email Correctly"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password Should Not Be Null"
        },
        len: {
          args: [6],
          msg: "Minimum Length of Password is 6"
        },
        notEmpty: {
          args: true,
          msg: "Password Should Not Be Empty"
        }
      }
    },
    role: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = getHashPassword(user.password)
        user.role = 'customer'
      }
    }
  });
  return User;
};