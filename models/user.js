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
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "invalid email format"
        },
        notEmpty: {
          args: true,
          msg: "password is required"
        }
      }

    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: "password must be at least"
        },
        notEmpty: {
          args: true,
          msg: "password is required"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};