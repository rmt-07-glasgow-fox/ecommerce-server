'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {foreignKey : 'UserId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args : true,
          msg : 'Email is required'
        },
        notNull : {
          args : true,
          msg : 'Email is required'
        }
      },
      allowNull : false,
      unique : {
        args : true,
        msg : "Email already registered"
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len : {
          args : [6],
          msg : 'Password minimal of 6 characters'
        }
      }
    },
    role : {
      type : DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate(user, options){
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};