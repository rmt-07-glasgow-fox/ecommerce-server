'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Banners', [
      { imgUrl: 'https://chainlinkmarketing.com/wp-content/uploads/2019/07/Google-Display-Ad-Example-Vineyard-Vines.jpg', name: 'banner1', UserId: 1, createdAt: new Date(), updatedAt: new Date() },
      { imgUrl: 'https://chainlinkmarketing.com/wp-content/uploads/2019/07/Google-Display-Ad-Example-UGG.jpg', name: 'banner2', UserId: 1, createdAt: new Date(), updatedAt: new Date() },
      { imgUrl: 'https://chainlinkmarketing.com/wp-content/uploads/2019/07/Google-Display-Ad-Example-Harrods.jpg', name: 'banner3', UserId: 1, createdAt: new Date(), updatedAt: new Date() },
      { imgUrl: 'https://chainlinkmarketing.com/wp-content/uploads/2019/07/Google-Display-Ad-Example-Nike.jpg', name: 'banner4', UserId: 1, createdAt: new Date(), updatedAt: new Date() },
      { imgUrl: 'https://chainlinkmarketing.com/wp-content/uploads/2019/07/Google-Display-Ad-Example-RocketMortgage.jpg', name: 'banner5', UserId: 1, createdAt: new Date(), updatedAt: new Date() },
      { imgUrl: 'https://chainlinkmarketing.com/wp-content/uploads/2019/07/Google-Display-Ad-Example-Perigold-Furnishing.jpg', name: 'banner6', UserId: 1, createdAt: new Date(), updatedAt: new Date() },
      { imgUrl: 'https://chainlinkmarketing.com/wp-content/uploads/2019/07/Google-Display-Ad-Example-Wayfair.jpg', name: 'banner7', UserId: 1, createdAt: new Date(), updatedAt: new Date() },
      { imgUrl: 'https://chainlinkmarketing.com/wp-content/uploads/2019/07/Google-Display-Ad-Example-Cadillac.jpg', name: 'banner8', UserId: 1, createdAt: new Date(), updatedAt: new Date() },
      { imgUrl: 'https://chainlinkmarketing.com/wp-content/uploads/2019/07/Google-Display-Ad-Example-Sherwin-Williams.jpg', name: 'banner9', UserId: 1, createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Banners', null, {})
  }
};
