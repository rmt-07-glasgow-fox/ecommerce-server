'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Categories', [
            { name: 'shoes', createdAt: new Date(), updatedAt: new Date() },
            { name: 'hoodie', createdAt: new Date(), updatedAt: new Date() },
            { name: 'sweeter', createdAt: new Date(), updatedAt: new Date() }
        ])
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Categories', [
            { name: 'shoes' },
            { name: 'hoodie' },
            { name: 'sweeter' }
        ]);

    }
};