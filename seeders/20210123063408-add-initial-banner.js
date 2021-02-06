'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let banners = [
      {
        name: 'Banner 1',
        url: 'https://d29c1z66frfv6c.cloudfront.net/pub/media/banner/W02_HOMEPAGE_LADIES_MEN_START_NEW.jpg'
      },
      {
        name: 'Banner 2',
        url: 'https://d29c1z66frfv6c.cloudfront.net/pub/media/banner/W02_LADIES_CNY_START_NEW.jpg'
      },
      {
        name: 'Banner 3',
        url: 'https://d29c1z66frfv6c.cloudfront.net/pub/media/banner/W03_HOMEPAGE_KIDS_CNY_ITS_THE_YEAR.jpg'
      }
    ]
    banners.map(banner => {
      banner.createdAt = new Date();
      banner.updatedAt = new Date();
    })
   await queryInterface.bulkInsert('Banners', banners, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Banners', null, {})
  }
};
