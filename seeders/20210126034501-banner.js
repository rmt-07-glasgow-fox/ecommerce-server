'use strict';

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
   await queryInterface.bulkInsert('Banners', [
    {
      title: "PC Components",
      status: true,
      image_url: "https://www.ohc.co.nz/wp-content/uploads/2018/12/Computer-Service-Banner-sml.png",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Headset",
      status: true,
      image_url: "https://north-america.beyerdynamic.com/media/catalog/category/beyerdynamic-Katalogbanner-Amiron-Copper-ohne-bubble.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Desktop PC",
      status: true,
      image_url: "https://nextshop.pk/wp-content/uploads/2018/08/New-Refurbished-Banner.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Banners', null, {});
  }
};
