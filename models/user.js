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
      allowNull: {
        args: false,
        msg: "Email is required"
      },
      unique: {
        args:true, 
        msg: "Email already used"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Password is required"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required"
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Name is required"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate (instance, option) {
        if (!instance.role || instance.role === "") {
          instance.role = "customer"
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};