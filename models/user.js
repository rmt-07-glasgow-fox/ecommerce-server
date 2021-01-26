'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/hash');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { as: 'product', foreignKey: 'userId' });
      User.hasMany(models.Wishlist, { as: 'wishlist', foreignKey: 'userId' });
      User.hasOne(models.Cart, { as: 'cart', foreignKey: 'userId' });
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'field email is required'
        },
        isEmail: {
          msg: 'invalid email'
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'field password is required'
        },
        len: {
          args: 4,
          msg: 'password at least have 4 character'
        }
      }
    },
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'customer'],
      allowNull: false,
      defaultValue: 'customer',
      validate: {
        isIn: {
          args: [
            ['admin', 'customer']
          ],
          msg: "role should be one of admin or customer"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance) {
        instance.password = hashPassword(instance.password);
      }
    }
  });
  return User;
};