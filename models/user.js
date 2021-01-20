'use strict';
const { hashPassword } = require('../helpers/bcrypt') 
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
      this.belongsToMany(models.Product, {
        through: models.Cart,
        foreignKey: 'ProductId'
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Email Cannot Be Empthy"
      },
      validate: {
        isEmail: {
          args: true,
          msg: "input must be email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Password Cannot Be Empthy"
      },
      validate: {
        len: {
          args: [6, 100],
          msg: "Password at least have 6 characters"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'role cannot be empthy'
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, opt) => {
        user.role = 'customer'
        user.password = hashPassword(user.password)
        console.log(user.password)
      } 
    },  
    sequelize,
    modelName: 'User',
  });
  return User;
};