'use strict';

const product = [

  {
    name: 'Ultra Wireless S50 Headphones S50 with Bluetooth',
    image_url: 'https://transvelo.github.io/electro-html/2.0/assets/img/720X660/img1.jpg',
    price: 3000000,
    stock: 20,
    category: 'elektronik',
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    name: 'AA EliteBook G2',
    image_url: 'https://elab.stylemixthemes.com/demo-4/wp-content/uploads/sites/6/2019/04/macbook-1-100x100.png',
    price: 5000000,
    stock: 20,
    category: 'Computer and Laptop',
    createdAt : new Date(),
    updatedAt : new Date()
  }
]

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
    await queryInterface.bulkInsert("Products", product,{})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {})
  }
};
