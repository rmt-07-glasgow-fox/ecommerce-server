const { Banner } = require('../models');

exports.create = async (req, res, next) => {
  const { title, status, image_url } = req.body;

  try {
    const body = {
      title: title,
      status: status,
      image_url: image_url,
    };

    const banner = await Banner.create(body);

    return res.status(201).json(banner);
  } catch (err) {
    return next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const banners = await Banner.findAll({ order: [['createdAt', 'ASC']] });

    return res.status(200).json(banners);
  } catch (err) {
    return next(err);
  }
};

exports.update = async (req, res, next) => {
  const id = req.params.id;

  const { title, status, image_url } = req.body;

  try {
    const body = {
      title: title,
      status: status,
      image_url: image_url,
    };

    const isFound = await Banner.findOne({ where: { id: id } });

    if (!isFound) return next({ name: 'NotFound', attr: 'Banner' });

    const cat = await Banner.update(body, { where: { id: id } });
    return res.status(200).json(cat);
  } catch (err) {
    return next(err);
  }
};

exports.destroy = async (req, res, next) => {
  const id = req.params.id;

  try {
    const isFound = await Banner.findOne({ where: { id: id } });

    if (!isFound) return next({ name: 'NotFound', attr: 'Banner' });

    await Banner.destroy({ where: { id: id } });
    return res.status(200).json({ message: 'Banner has been deleted' });
  } catch (err) {
    next(err);
  }
};
