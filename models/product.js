'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Product.belongsTo(models.Category, { as: 'category', foreignKey: 'categoryId' });
            Product.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });

        }
    };
    Product.init({
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field name is required'
                }
            }
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'field price is required'
                },
                min: {
                    args: [0],
                    msg: 'price cannot be negative'
                }
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'field stock is required'
                },
                min: {
                    args: [0],
                    msg: 'stock cannot be negative'
                }
            }
        },
        categoryId: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'field category is required'
                }
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'field user is required'
                }
            }
        },
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};