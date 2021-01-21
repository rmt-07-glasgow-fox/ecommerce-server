'use strict';
const {hashPassword} = require('../helpers/bcrypt')
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
    getFullName() {
      return `${this.first_name} ${this.last_name}`
    }
  };
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "first name cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "first name cannot be empty"
        }
      }
    },
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "email cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "email cannot be empty"
        },
        isEmail: {
          args: true,
          msg: "invalid email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "password cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "password cannot be empty"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "image url cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "image url cannot be empty"
        },
        isIn: {
          args: ['admin','customer'],
          msg: "invalid role"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = hashPassword(instance.password)
        if(!instance.last_name) instance.last_name = instance.first_name;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};