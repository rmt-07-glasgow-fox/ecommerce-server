'use strict';
const {hashing} = require('../helper/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart)
      User.belongsToMany(models.Product, { through: 'WishList' })
    }
  };
  User.init({
    firstname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    hooks:{
      beforeCreate:(user)=>{
        if (user.password) {
          user.password = hashing(user.password)
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};