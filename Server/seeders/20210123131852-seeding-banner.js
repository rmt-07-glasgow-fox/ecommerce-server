'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      const data = [
        {
          title: 'Banner Toko',
          image_url: 'https://promosiusaha.id/wp-content/uploads/2020/12/banner-3.png',
          status: 'available',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Big Sale',
          image_url: 'https://previews.123rf.com/images/hollygraphic/hollygraphic1511/hollygraphic151100020/48173455-big-sale-banner-design.jpg',
          status: 'available',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

   return queryInterface.bulkInsert('Banners', data, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Banners', null, {})
  }
};
