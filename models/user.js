'use strict';
const { hashPass } = require('../helpers/bcrypt.js');

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
      User.hasMany(models.Product, { foreignKey: 'UserId' });
    }
  };
  User.init({
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'First name is required'
        },
        len: {
          args: [1, 50],
          msg: 'The length of first name must be less than 50 characters.'
        }
      }
    },
    lastname: { type: DataTypes.STRING },
    profpic: { type: DataTypes.STRING, },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is required'
        },
        isEmail: {
          args: true,
          msg: 'Format email is invalid'
        },
        len: {
          args: [1, 50],
          msg: 'The length of email must be less than 50 characters.'
        }
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'You need password for security reason.'
        },
        len: {
          args: [4, 50],
          msg: 'Minimal and maximal password length is 4 - 50 characters'
        }
      }
    },
    role: { type: DataTypes.STRING, }
  }, {
    hooks: {
      beforeCreate(user, options) {
        user.firstname = user.firstname[0].toUpperCase() + user.firstname.slice(1).toLowerCase();
        user.password = hashPass(user.password);
        !user.lastname ? user.lastname = user.firstname : user.lastname;
        !user.profpic ? user.profpic = `https://ui-avatars.com/api/?name=${user.firstname}&background=random&length=1&bold=true&color=ffffff` : user.profpic;
        !user.role ? user.role = 'customer' : user.role;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};