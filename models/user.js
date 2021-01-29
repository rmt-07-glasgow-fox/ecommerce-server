'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.product, {through: models.cart, foreignKey: 'UserId'})
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
    hooks: {
      beforeCreate(instance, option){
        instance.role = 'customer'
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'user',
  });
  return user;
};