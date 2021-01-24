const { Product } = require("../../models/")
require("dotenv").config()

exports.clearProducts = () => {
  if (process.env.NODE_ENV === "test") {
    return Product.destroy({ truncate: true });
  }
};
