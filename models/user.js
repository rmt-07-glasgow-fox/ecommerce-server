'use strict';
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email field must be filled"
        },
        notNull: {
          msg: "Null Email not allowed"
        },
        isEmail: {
          args: true,
          msg: "Invalid email format"
        }
      },
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password field must be filled"
        },
        notNull: {
          msg: "Null Password not allowed"
        },
        len: {
          args: [4],
          msg: "Password must contain minimum 4 characters"
        }
      },
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.role = 'customer'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};