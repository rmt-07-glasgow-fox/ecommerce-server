'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
    }
  };
  User.init({
    email: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'Email cannot be empty'
        },
        isEmail:{
          msg: 'Please Use Correct Email Format'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'Email cannot be empty'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user){
        user.password = hashPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};