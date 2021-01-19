'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: `Email is'nt an email`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Role is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};