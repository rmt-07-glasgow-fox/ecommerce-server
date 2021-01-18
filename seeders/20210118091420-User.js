'use strict';
const { hashPassword } = require('../helpers/hash');
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            { email: 'm.trinandanoviardy@gmail.com', password: hashPassword('qwerty'), role: 'admin', createdAt: new Date(), updatedAt: new Date() },
            { email: 'pevitapearce@gmail.com', password: hashPassword('qwerty'), role: 'admin', createdAt: new Date(), updatedAt: new Date() }
        ])
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', [
            { email: 'm.trinandanoviardy@gmail.com', password: hashPassword('qwerty'), role: 'admin' },
            { email: 'pevitapearce@gmail.com', password: hashPassword('qwerty'), role: 'admin' }
        ]);
    }
};