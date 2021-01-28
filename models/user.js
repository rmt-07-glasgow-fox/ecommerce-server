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
      User.hasMany(models.Cart)
      User.hasMany(models.Wishlist)
      // User.belongsToMany(models.Product, { through: models.Cart })
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty!'
        }
      }
    },
    avatar: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty!'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
      //   notEmpty: {
      //     msg: 'Role cannot be empty!'
      //   }
      // }
    }
  }, {
    hooks: {
      beforeCreate(user, opt) {
        !user.role && (user.role = 'customer')
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};