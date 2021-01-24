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
        name: 'Kayu Balok',
        image_url: 'https://i0.wp.com/supplierkayuindonesia.com/wp-content/uploads/2019/03/Harga-Kayu-Ulin-per-kubik.jpg?resize=680%2C350&ssl=1',
        category: 'kayu',
        price: 120000,
        stock: 115,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Besi Beton',
        image_url: 'https://blogpictures.99.co/sumber-besibetonnet.png',
        category: 'besi',
        price: 90000,
        stock: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Baja',
        image_url: 'https://cdn.ralali.id/cdn-cgi/image/f=auto,w=500/assets/img/Libraries/257509_Besi-WF-298-x-12000_ex6mpUrXRp3gHWRt_1549442484.jpg',
        category: 'baja',
        price: 4500000,
        stock: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Semen',
        image_url: 'https://img.beritasatu.com/cache/beritasatu/910x580-2/1421853846.jpg',
        category: 'semen',
        price: 60000,
        stock: 240,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Keramik Granite Tile',
        image_url: 'https://planmuvi.com/wp-content/uploads/2018/09/Keramik.jpg',
        category: 'keramik',
        price: 120000,
        stock: 380,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Genteng Tanah Liat',
        image_url: 'https://cdn-radar.jawapos.com/uploads/radarbali/news/2018/11/19/genteng-pejaten-tabanan-rambah-luar-pulau-harga-kian-melambung_m_104340.jpg',
        category: 'genteng',
        price: 4000,
        stock: 5500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Batu Split',
        image_url: 'https://i0.wp.com/sbflashmaterials.com/wp-content/uploads/2018/12/split2-1.jpg?fit=666%2C500&ssl=1',
        category: 'batu',
        price: 300000,
        stock: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pasir',
        image_url: 'https://s.kaskus.id/r480x480/images/fjb/2019/06/12/distributor_pasir_bangunan_10618079_1560342466.jpg',
        category: 'pasir',
        price: 1200000,
        stock: 75,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bata Merah',
        image_url: 'https://www.semenrajawali.com/images-data/posts/2018/06/12/59/bata-merah2.jpg',
        category: 'bata',
        price: 700000,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    return queryInterface.bulkInsert('Materials', data, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Materials', null, {})
  }
};
