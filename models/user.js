'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, {through: models.Wishlist})
      User.hasMany(models.Transaction)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: `Email is Required`
        },
        isEmail: {
          msg: `Email is Invalid`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Password is Required`
        },
        len: {
          args: [6,100],
          msg: `Password Should Have Minimum 6 Characters`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [['admin', 'customer']],
          msg: `Invalid Role`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, opt) => {
    const hashed = hashPassword(user.password)
    user.password = hashed
    user.role = 'customer'
  })

  return User;
};