const { hashPassword } = require('../helper/hash');

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
      User.hasMany(models.Product)
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Name is required'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail:{
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len:{
          args:[3,12],
          msg:'Password must be 3 - 12 Characters'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', (instance,options) => {
    instance.role = 'Customer'
    instance.password = hashPassword(instance.password)
    })

  return User;
};