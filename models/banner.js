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
        }
    };
    Banner.init({
        image_url: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field image url is required'
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: {
                    msg: 'field status is required'
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Banner',
    });
    return Banner;
};