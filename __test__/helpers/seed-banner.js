const { Banner } = require('../../models')

function seedBanner(userId){
  if(process.env.NODE_ENV === 'test'){
    const input = {
      title: 'discon shoes',
      status: 'active',
      image_url: 'https://img.freepik.com/free-vector/sale-banner-with-product-description_1361-1333.jpg?size=626&ext=jpg',
      UserId: userId
    }
    return Banner.create(input)
  }
}

module.exports = seedBanner