"use strict";
const { Model } = require("sequelize");
const { generateHash } = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Cart, {
        through: 'Carts',
        as: 'carts',
        foreignKey: 'UserId',
        otherKey: 'ProdId'
      });

      User.belongsToMany(models.Wishlist, {
        through: 'Wishlists',
        as: 'wishlist',
        foreignKey: 'UserId',
        otherKey: 'ProdId'
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Email is required",
          },
          isEmail: {
            args: 'email',
            msg: 'Email must be valid email address'
          }
        },
        unique: {
          msg: "Email must be unique"
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password is required",
          },
          len: {
            args: [6],
            msg: "Password at least 6 characters"
          }
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "customer",
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(user, option) {
          user.role = 'customer'
          user.password = generateHash(user.password)
        }
      }
    }
  );
  return User;
};
