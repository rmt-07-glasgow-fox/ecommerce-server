'use strict';
const {hashPassword} = require('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Products', [
     {
      name: 'Overshirt',
      image_url: 'https://www3.assets-gap.com/webcontent/0018/648/446/cn18648446.jpg',
      price: 1500000,
      stock: 15,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Leather Moto Jacket',
      image_url: 'https://www3.assets-gap.com/webcontent/0018/648/446/cn18648446.jpg',
      price: 900000,
      stock: 25,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Double-Breasted Blazer',
      image_url: 'https://www3.assets-gap.com/webcontent/0019/482/762/cn19482762.jpg',
      price: 1200000,
      stock: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Softspun Sleeveless Twist-Knee',
      image_url: 'https://www1.assets-gap.com/webcontent/0019/447/825/cn19447825.jpg',
      price: 1800000,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Tunic Crewneck Sweatshirt',
      image_url: 'https://www4.assets-gap.com/webcontent/0019/476/860/cn19476860.jpg',
      price: 900000,
      stock: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Double-Breasted Blazer Black',
      image_url: 'https://www1.assets-gap.com/webcontent/0019/436/843/cn19436843.jpg',
      price: 1000000,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'sleeveless Wrap-Front Jumpsuit',
      image_url: 'https://www.gap.com/webcontent/0018/766/644/cn18766644.jpg',
      price: 200000,
      stock: 24,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Softspun V-neck Jumpsuit',
      image_url: 'https://www2.assets-gap.com/webcontent/0018/129/362/cn18129362.jpg',
      price: 4500000,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Utility Romper',
      image_url: 'https://www2.assets-gap.com/webcontent/0018/129/362/cn18129362.jpg',
      price: 9500000,
      stock: 12,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {})
  }
};
