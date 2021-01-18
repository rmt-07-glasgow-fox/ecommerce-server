'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Material.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Item Name should not be empty!'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          args: true,
          msg: 'Invalid URL format!'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Item Category should not be empty!'
        },
      }
    },
    price: {
      type: DataTypes.DOUBLE,
      validate: {
        min: {
          args: 1,
          msg: 'Item Price minimal 0 Rupiah!'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'Item Stock minimal 0 item!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Material',
  });
  return Material;
};