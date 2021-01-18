'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Admin.hasMany(models.Product)
      // define association here
    }
  };
  Admin.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
    type: DataTypes.STRING,
    validate: {
      len: [6],
      notEmpty: true
    }
    }
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};