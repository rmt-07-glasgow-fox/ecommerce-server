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
    await queryInterface.bulkInsert('Products', [
      {
          "name": "Keyboard Logitech K380",
          "image_url": "https://www.jakartanotebook.com/images/products/41/67/17659/2/logitech-multi-device-bluetooth-keyboard-k380-black-7.jpg",
          "price": 100000,
          "stock": 5,
          "CategoryId": 4,
          "createdAt": new Date(),
          "updatedAt": new Date()
      },
      {
          "name": "Mouse Logitech B100",
          "image_url": "https://www.jakartanotebook.com/images/products/40/67/7435/2/logitech-wired-mouse-b100-black-3.jpg",
          "price": 70000,
          "stock": 4,
          "CategoryId": 1,
          "createdAt": new Date(),
          "updatedAt": new Date()
      },
      {
          "name": "Printer Epson L3110",
          "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//106/MTA-2669479/epson_epson-l3110-ecotank-multifungsi-printer--print--scan--copy-_full05.jpg",
          "price": 2500000,
          "stock": 7,
          "CategoryId": 2,
          "createdAt": new Date(),
          "updatedAt": new Date()
      },
      {
          "name": "Aspire 3 A314-32",
          "image_url": "https://www.jakartanotebook.com/images/products/1/3/48030/2/acer-aspire-3-a314-32-c2uy-laptop-intel-n4120-4gb-1tb-14-inch-windows-10-black-1.jpg",
          "price": 4999999,
          "stock": 10,
          "CategoryId": 3,
          "createdAt": new Date(),
          "updatedAt": new Date()
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
    await queryInterface.bulkDelete('Products', null, {})
  }
};
