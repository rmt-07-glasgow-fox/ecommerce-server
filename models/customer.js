"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt.js");

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsToMany(models.Product, { through: models.Cart });
    }
  }
  Customer.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: { msg: 'Email already used' },
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Invalid email format",
          },
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          len: {
            args: [3],
            msg: "Password minimal 3 chararcters",
          },
          notEmpty: {
            msg: "Password is required",
          },
        },
      },
      role: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  Customer.addHook("beforeCreate", "hashPassword", (instance, options) => {
    instance.password = hashPassword(instance.password);
  });
  Customer.addHook("beforeCreate", "addCustomerRole", (instance, options) => {
    instance.role = "customer"
  });
  return Customer;
};
