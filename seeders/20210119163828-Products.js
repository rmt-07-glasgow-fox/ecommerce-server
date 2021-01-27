'use strict';
const {
  hashPass
} = require("../helpers/bcrypt")
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name: "Monster Hunter World",
      imageUrl: "https://www.monsterhunterworld.com/sp/images/top/bg_mv.jpg",
      price: 699999,
      stock: 100,
      genre: "adventure",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Cyberpunk 2077",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
      price: 699999,
      stock: 100,
      genre: "adventure",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Ghost of Tsushima",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BMjEwYjRjZjctNWRmNy00NDA1LWE1MjYtYTlhMWIzZGNhMWYxXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_.jpg",
      price: 699999,
      stock: 100,
      genre: "adventure",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "God of War",
      imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81N3xkq5Y9L.jpg",
      price: 699999,
      stock: 100,
      genre: "adventure",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Final Fantasy XV (Royal Edition)",
      imageUrl: "https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/99/UP0082-CUSA01633_00-FFXVROYALEDITION/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=720&h=720",
      price: 699999,
      stock: 100,
      genre: "adventure",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Uncharted 4: A Thief's End",
      imageUrl: "https://assets2.ignimgs.com/2015/06/03/uncharted-4-button-v2jpg-5a448e.jpg",
      price: 699999,
      stock: 100,
      genre: "adventure",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Red Dead Redemption II",
      imageUrl: "https://cf.shopee.com.my/file/78f0fd149a90a973d40f800a4f73ecaf",
      price: 699999,
      stock: 100,
      genre: "adventure",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Red Dead Redemption III",
      imageUrl: "https://preview.redd.it/ozrto5pni8e21.jpg?auto=webp&s=e2cc1f62a86ab8d343123e63d6f0e1c6e2ae8d2d",
      price: 699999,
      stock: 100,
      genre: "adventure",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Resident Evil 7: Biohazard",
      imageUrl: "https://cdn-products.eneba.com/resized-products/775e29241e8b57f2701c7e042ccbb53d_350x200_1x-0.jpg",
      price: 699999,
      stock: 100,
      genre: "adventure",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Horizon Zero Dawn",
      imageUrl: "https://image.api.playstation.com/cdn/HP9000/CUSA05682_00/1J6HqFz7q5jR0bS1poj3oYbQ9veI64NgpGHo36qeC4CfwrLjikjQYONSqBtwXwiU.png",
      price: 699999,
      stock: 100,
      genre: "adventure",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Sekiro: Shadows Die Twice",
      imageUrl: "https://www.gamerguides.com/assets/guides/167/packshot_9eea295752b26541cac101c925d9d74a.jpg",
      price: 699999,
      stock: 100,
      genre: "adventure",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "The Last of Us Part II",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/4f/TLOU_P2_Box_Art_2.png",
      price: 699999,
      stock: 100,
      genre: "adventure",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Metro: Exodus",
      imageUrl: "https://image.api.playstation.com/vulcan/img/rnd/202010/2814/jhNIE3yH1SNEe9CmxTVHAdme.png",
      price: 699999,
      stock: 100,
      genre: "adventure",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Assassin's Creed Odyssey",
      imageUrl: "https://www.digiseller.ru/preview/845375/p1_2639352_132d2327.jpg",
      price: 699999,
      stock: 100,
      genre: "adventure",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "The Witcher III: Wild Hunt",
      imageUrl: "https://image.api.playstation.com/vulcan/img/rnd/202009/2913/TQKAd8U6hnIFQIIcz6qnFh8C.png",
      price: 699999,
      stock: 100,
      genre: "adventure",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
