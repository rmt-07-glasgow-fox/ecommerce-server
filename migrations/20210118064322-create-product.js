'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            image_url: {
                type: Sequelize.STRING,
                allowNull: true
            },
            price: {
                type: Sequelize.INTEGER
            },
            stock: {
                type: Sequelize.INTEGER
            },
            categoryId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Categories',
                    key: 'id'
                },
                onDelete: 'Cascade',
                onUpdate: 'Cascade'
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onDelete: 'Cascade',
                onUpdate: 'Cascade'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Products');
    }
};