'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "Invalid Email Format"},
        notEmpty: { msg: "Email required"},
        notNull: { msg: "Email required"},
        dupEmail(value) {
          return User.findAll ({ where: {email: value}})
          .then(user => {
            if (user.length != 0) {
              throw new Error("This email has been taken")
            }
          })
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty : { msg : "Password Required"},
        notNull: { msg : "Password Required"}
      }
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty : { msg : "Role Required"},
        notNull: { msg : "Role Required"}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};