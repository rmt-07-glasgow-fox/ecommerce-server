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

      Banner.belongsTo(models.User, { foreignKey: "userId" });
    }
  };
  Banner.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Banner title required"
        }
      }
    },
    image_url: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          msg: "Status required"
        },
        isBool(value) {
          if (value !== true && value !== false) {
            throw new Error('Status invalid');
          }
        }
      }
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Banner',
  });

  Banner.beforeCreate((banner, options) => {
    if (!banner.image_url) {
      banner.image_url = "https://www.macmillandictionary.com/us/external/slideshow/full/Grey_full.png"
    }
  });

  return Banner;
};