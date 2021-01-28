'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Banner.belongsTo(models.User)
    }
  };
  Banner.init({
    title: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg:'title must be filled'
        }
      }
    },
    status: DataTypes.STRING,
    image_url: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg:'image_url must be filled'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};