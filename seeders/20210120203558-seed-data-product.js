'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
    {
      name: "The Second's Coming Gluttony Book 2",
      image_url: "https://1.bp.blogspot.com/-rmY8lRHfnlA/XyffcBZAXfI/AAAAAAAAAF0/tahjWmJ2-UIwS9daDV-qi1h-DSEcIlWLACLcBGAsYHQ/s0/SCG2-min.PNG",
      price: 76999,
      stock: 100,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Overgeared Book 2",
      image_url: "https://cdn.wuxiaworld.com/images/covers/og.jpg?ver=5224bb795f9ca73f40e8789f98bd4390993ee996",
      price: 77777,
      stock: 100,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Jacket Miami Hotline",
      image_url: "https://www.danezon.com/wp-content/uploads/2018/12/Hotline-Miami-Varsity-Jacket.jpg",
      price: 200000,
      stock: 100,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Yin yang Jacket",
      image_url: "https://images-na.ssl-images-amazon.com/images/I/61d6ezLV36L._AC_UL1000_.jpg",
      price: 180000,
      stock: 100,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
