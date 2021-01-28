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
    await queryInterface.bulkInsert('Products', [{
      name:'Nike XXX',
      image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-shoe-2V5C4p.jpg',
      price: 1000000,
      stock: 15,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name:'Fan YY',
      image_url: 'https://res.cloudinary.com/ruparupa-com/image/upload/f_auto,q_auto/l_ace:c5f05d:8cb580/f_auto,q_auto:eco/v1527783043/Products/10146877_1.jpg',
      price: 235000,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name:'Sumsang TOne',
      image_url: 'https://i.pcmag.com/imagery/reviews/03xdTO0Ka4H4KvEgtSPg4c2-12.1569479325.fit_lpad.size_625x365.jpg',
      price: 7000000,
      stock: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name:'IHONE',
      image_url: 'https://www.popsci.com/resizer/6iA2dK-qrizE_TrGloIM5mYz5Mw=/760x570/filters:focal(600x450:601x451)/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/VYHDQWEYQJMUBJTKNV4MMC5KMU.jpg',
      price: 10000000,
      stock: 45,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name:'Ibanez Az',
      image_url: 'https://i.ebayimg.com/images/g/8OAAAOSwBF5eT2S1/s-l600.jpg',
      price: 8500000,
      stock: 13,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
