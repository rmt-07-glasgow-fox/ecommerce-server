const { Product } = require('../../models')

function seedProduct(userId){
  if(process.env.NODE_ENV === 'test'){
    const input = {
      name: 'Xiaomi Redmi note 8',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG59KsqpvysuZe7OaHqRVFZ13JrXxrzNmj5upiZCm9BsutVfvevcKl95HSOUsLZJfWa3fLl2FY&usqp=CAc',
      price: 2100000,
      stock: 10,
      UserId: userId
    }
    return Product.create(input)
  }
}

module.exports = seedProduct