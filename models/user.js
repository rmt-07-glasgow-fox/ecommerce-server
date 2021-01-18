'use strict';
const {
  Model
} = require('sequelize');
const encrypt = require('../helpers/bcryptHelper').encrypt
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate:{
        notEmpty:{
          msg: 'Email field is required.'
        },
        isEmail:{
          msg: 'Please enter valid email.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Password field is required.'
        },
        len:{
          args: [8],
          msg: 'Password must contain at least 8 characters.'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    hooks:{
      beforeCreate: (instance, options) => {
        instance.password = encrypt(instance.password)
        if(!instance.role){
          instance.role = 'customer'
        }
      }
    },
    modelName: 'User',
  });
  return User;
};