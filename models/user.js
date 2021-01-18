'use strict';
const {
    Model
} = require('sequelize');
const { hashPassword } = require('../helpers/hash');
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
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: {
            type: DataTypes.ENUM,
            values: ['admin', 'customer'],
            allowNull: false,
            defaultValue: 'customer'
        }
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate(instance) {
                instance.password = hashPassword(instance.password);
            }
        }
    });
    return User;
};