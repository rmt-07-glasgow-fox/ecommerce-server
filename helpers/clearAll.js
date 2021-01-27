const { Product, User } = require("../models")

const clearProduct = () => {
  if (process.env.NODE_ENV === "test") {
    return Product.destroy({ where: {} })
  }
}

const clearNewUser = () => {
  if (process.env.NODE_ENV === "test") {
    return User.destroy({ where: { email: "new@mail.com" }})
  }
}

module.exports = {
  clearProduct,
  clearNewUser
}