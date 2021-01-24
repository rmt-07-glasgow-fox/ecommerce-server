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
   const data = [
      {
        name: 'Sepatu Naik',
        image_url: 'https://i.insider.com/5e3826525bc79c20f907a1d6?width=700&format=jpeg&auto=webp',
        price: 500000,
        stock: 3,
        createdAt: new Date (),
        updatedAt: new Date ()
      },
      {
        name: 'T-shirt',
        image_url: 'https://imgs.michaels.com/MAM/assets/1/726D45CA1C364650A39CD1B336F03305/img/893E44B4248847338CD88E85BD79D361/10186027_r.jpg?fit=inside|540:540',
        price: 40000,
        stock: 10,
        createdAt: new Date (),
        updatedAt: new Date ()
      },
      {
        name: 'Eye Watch',
        image_url: 'https://gadget.telset.id/wp-content/uploads/thumbs_dir/2ae3ca670b9b77b9d7c7c8345413d761-nw3w069dexv5on024zzzvh39j705gwwg3qrr4odeq0.jpeg',
        price: 1000000,
        stock: 5,
        createdAt: new Date (),
        updatedAt: new Date ()
      },
      {
        name: 'Reyben Sunglasses',
        image_url: 'https://www.ray-ban.com/_repository/_resources/productscatalog/sun/images/Clubmaster-Classic.jpg',
        price: 80000,
        stock: 4,
        createdAt: new Date (),
        updatedAt: new Date ()
      },
      {
        name: 'Billy Jeans',
        image_url: 'https://oldnavy.gap.com/webcontent/0017/090/947/cn17090947.jpg',
        price: 80000,
        stock: 7,
        createdAt: new Date (),
        updatedAt: new Date ()
      }
  ]

    await queryInterface.bulkInsert ('Products', data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete ('Products')
  }
};
