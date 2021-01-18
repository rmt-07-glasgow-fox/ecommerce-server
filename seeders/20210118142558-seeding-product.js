'use strict';

const prod = [{
  name : 'baju kerens',
  image_url : 'https://tshirtbar.id/wp-content/uploads/2020/10/sample_poly1-545x500.jpg',
  price : 100000,
  stock : 2,
  createdAt : new Date(),
  updatedAt : new Date()

}, {
  name : 'baju keren 2',
  image_url : 'https://cdn.elevenia.co.id/g/9/2/5/3/1/3/23925313_B.jpg',
  price : 120000,
  stock : 3,
  createdAt : new Date(),
  updatedAt : new Date()
}]

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
   await queryInterface.bulkInsert('Products', prod, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null)
  }
};
