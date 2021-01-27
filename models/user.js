'use strict';
const {
  Model
} = require('sequelize');
const { hashingPassword } = require('../helpers/bcrypt');
const { use } = require('../routes/cartRoute');
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
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Your email format is invalid'
        },
        notEmpty: {
          args: true,
          msg: 'Email required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password required'
        },
        len: {
          args: [6],
          msg: 'Password atleast 6 characters'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Role required'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username required'
        }
      }
    }
  },
  {
    hooks: {
      beforeCreate: (user, options) =>  {
        user.password = hashingPassword(user.password)
        user.role = 'customer'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};