'use strict';
const { hashPassword } =  require ('../helpers/bcrypt')

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
      User.belongsToMany(models.Product, {
        through: models.Cart,
        foreignKey: 'userId'
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password required'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Role required'
        }
      }
    },
    balance: {
      type: DataTypes.DOUBLE
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword (user.password)
      }
    }
  });
  return User;
};