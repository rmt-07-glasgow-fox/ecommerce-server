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
      type:DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Invalid format email"
        }
      }
    },
    username:{
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: "Username cannot empty"
        }
      }
    }, 
    role: DataTypes.STRING,
    password:{
      type: DataTypes.STRING,
      validate:{
        len: {
          args: [4],
          msg: "Password must be min 4 characters length"
        }
      }
    }, 
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};