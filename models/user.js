'use strict';
const { Model } = require('sequelize');
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
  }
  User.init(
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Firstname is required' },
          notEmpty: { args: true, msg: 'Firstname is required' },
        },
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Lastname is required' },
          notEmpty: { args: true, msg: 'Lastname is required' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Email is required' },
          notEmpty: { args: true, msg: 'Email is required' },
          isEmail: {
            args: true,
            msg: 'Email not valid',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Password is required' },
          notEmpty: { args: true, msg: 'Password is required' },
          len: {
            args: [6, 50],
            msg: 'Password at least 6 characters',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Role is required' },
          notEmpty: { args: true, msg: 'Role is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (user, options) => {
          user.role = 'customer';
        },
      },
    },
  );
  return User;
};
