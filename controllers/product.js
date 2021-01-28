const { Product, Category } = require('../models');
const { uploadImage, deleteImage } = require('../helpers/googleStorage');
const formidable = require('formidable');

exports.create = async (req, res, next) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) return next({ name: 'NotUpload' });

      const { name, price, stock, CategoryId } = fields;

      if (!name || !name.length) {
        return next({ name: 'Required', attr: 'Name' });
      }
      if (!price) {
        return next({ name: 'Required', attr: 'Price' });
      }
      if (price < 0) {
        return next({ name: 'Greater', attr: 'Price', value: 0 });
      }
      if (!stock) {
        return next({ name: 'Required', attr: 'Stock' });
      }
      if (stock < 0) {
        return next({ name: 'Greater', attr: 'Stock', value: 0 });
      }
      if (!CategoryId || Number(CategoryId) === 0) {
        return next({ name: 'Required', attr: 'Category' });
      }

      if (files.image) {
        if (files.image.size > 50000000) {
          return next({ name: 'ImageSize' });
        }

        const image_name = `p${req.user.id}_${Date.now()}`;
        const url = await uploadImage(files.image, image_name);
        const body = {
          name: name,
          price: Number(price),
          stock: Number(stock),
          CategoryId: Number(CategoryId),
          image_url: url,
          image_name: image_name,
        };

        const product = await Product.create(body);

        return res.status(201).json(product);
      } else {
        return next({ name: 'Required', attr: 'Image' });
      }
    });
  } catch (err) {
    return next({ name: 'FailedUpload' });
  }
};

exports.list = async (req, res, next) => {
  try {
    const products = await Product.findAll({ order: [['createdAt', 'ASC']], include: [Category] });

    return res.status(200).json(products);
  } catch (err) {
    return next(err);
  }
};

exports.update = async (req, res, next) => {
  const id = req.params.id;

  const { name, image_url, image_name, price, stock, CategoryId } = req.body;

  try {
    const category = await Category.findOne({ where: { id: CategoryId } });

    if (!category) return next({ name: 'NotFound', attr: 'Category' });

    const isFound = await Product.findOne({ where: { id: id } });

    if (!isFound) return next({ name: 'NotFound', attr: 'Product' });

    const body = {
      name: name,
      image_url: image_url,
      image_name: image_name,
      price: price,
      stock: stock,
      CategoryId: CategoryId,
    };

    const cat = await Product.update(body, { where: { id: id } });
    return res.status(200).json(cat);
  } catch (err) {
    return next(err);
  }
};

exports.destroy = async (req, res, next) => {
  const id = req.params.id;

  try {
    const isFound = await Product.findOne({ where: { id: id } });

    if (!isFound) return next({ name: 'NotFound', attr: 'Product' });

    await Product.destroy({ where: { id: id } });
    await deleteImage(isFound.image_name);
    return res.status(200).json({ message: 'Product has been deleted' });
  } catch (err) {
    next(err);
  }
};
