const { Product } = require('../../models/index.js');

let clearProduct = async (name) => {
  try {
    if (process.env.NODE_ENV === 'test') {
      const user = await Product.findOne({ where: { name } });

      if (user) return Product.destroy({ where: { name } });
    };
  } catch (err) {
    console.log(err);
  };
};

module.exports = clearProduct;