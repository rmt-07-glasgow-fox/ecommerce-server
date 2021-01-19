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
      User.hasMany(models.Product)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: "Error format Email" },
        notEmpty: { msg: "Email cant be Empty" }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Password cant be Empty" },
        len: {
          args: [5],
          msg: "Password need at least 5 characters"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Role cant be Empty" },
        isIn: {
          args: [['admin', 'customer']],
          msg:"Invalid input"
        }
      },
      defaultValue: "customer"
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};