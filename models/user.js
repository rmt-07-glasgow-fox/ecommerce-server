'use strict';
const { hashPassword } = require('../helpers/bcrypt');
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
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name must be filled'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: 'Minimum password length 6 characters'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['admin', 'customer']]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, option) {
        user.name = user.name.trim()
          .replace(/\s\s+/g, ' ')
          .toLowerCase().split(' ')
          .map(name => name[0].toUpperCase() + name.substring(1)).join(' ');
          
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};