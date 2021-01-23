'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt')
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
      allowNull:false,
      validate: {
        isEmail: { args: true, msg: 'Invalid email format'},
        notNull: { args: true, msg:'Email is required'},
        notEmpty: { args: true, msg: 'Email is required'}
      },
      unique:true
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: { args: true, msg:'Passwrod is required'},
        notEmpty: { args: true, msg: 'Password is required'},
        min: { args:[6], msg: 'Password atleast 6 characters'}
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = hashPassword(instance.password);
        instance.role = 'customer';
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};