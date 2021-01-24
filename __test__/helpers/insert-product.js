const { Product } = require('../../models')

const insertProduct = () => {
  if (process.env.NODE_ENV === 'test') {
    return Product.create({
      name: 'Sepatu',
      description: 'Sepatu hitam adades',
      category: 'Shoes',
      image_url: 'https://cdn.popmama.com/content-images/post/20191217/hc39468e5ceee44c49c892c0e334a111ehjpg-q50-e62609efe3386029018997c67b15976f_600xauto.jpg',
      price: 250000,
      stock: 5
    })
  }
}

module.exports = insertProduct
