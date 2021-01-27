'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartItem.belongsTo(models.Cart)
      CartItem.belongsTo(models.Product)
    }
  };
  CartItem.init({
    CartId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Quantity input required'
        }
        // async vaidateQty(val) {
        //   console.log(+val > 20);
        //   if (this.isNewRecord === false && +val > 20 && +val < 1) {
        //     throw await new Error('cmn bsa 1-20')
        //   }
        // }
      }
    }
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};