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
      name: 'Nike Air Force',
      image_url: 'https://images.unsplash.com/photo-1595910781386-e392beb18b6b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=532&q=80',
      price: 1429000,
      stock: 250,
      createdAt: new Date(), 
      updatedAt: new Date()
    },
    {
      name: 'Modern Glasses',
      image_url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      price: 429000,
      stock: 200,
      createdAt: new Date(), 
      updatedAt: new Date()
    },
    {
      name: 'Daniel Wellington Wristwatch',
      image_url: 'https://images.unsplash.com/photo-1521127376958-80338b32f37b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      price: 699000,
      stock: 250,
      createdAt: new Date(), 
      updatedAt: new Date()
    },
    {
      name: 'Polaroid 600',
      image_url: 'https://images.unsplash.com/photo-1605896403910-0e4217c2e3e6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=501&q=80',
      price: 1429000,
      stock: 100,
      createdAt: new Date(), 
      updatedAt: new Date()
    },
    {
      name: 'Gabrielle Chanel',
      image_url: 'https://images.unsplash.com/photo-1591348278210-51fa23452a5f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      price: 2000000,
      stock: 200,
      createdAt: new Date(), 
      updatedAt: new Date()
    },
    {
      name: 'Canaletto',
      image_url: 'https://images.unsplash.com/photo-1602937898780-dd249aba8bc2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      price: 1429000,
      stock: 250,
      createdAt: new Date(), 
      updatedAt: new Date()
    },
    {
      name: 'Coffee Maker',
      image_url: 'https://images.unsplash.com/photo-1570569962804-5377da5be035?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=524&q=80',
      price: 899000,
      stock: 150,
      createdAt: new Date(), 
      updatedAt: new Date()
    },
    {
      name: 'Leisara Handbag',
      image_url: 'https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=467&q=80',
      price: 299000,
      stock: 250,
      createdAt: new Date(), 
      updatedAt: new Date()
    }
  ])
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
