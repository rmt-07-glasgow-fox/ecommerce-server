const { Banner } = require('../models');
const { uploadImage, deleteImage } = require('../helpers/googleStorage');
const formidable = require('formidable');

exports.create = async (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) return next({ name: 'NotUpload' });

    const { title, status } = fields;

    if (!title || !title.length) {
      return next({ name: 'Required', attr: 'Title' });
    }

    if (files.image) {
      if (files.image.size > 50000000) {
        return next({ name: 'ImageSize' });
      }

      const image_name = `${req.user.id}_${Date.now()}`;
      uploadImage(files.image, image_name)
        .then((url) => {
          const body = {
            title: title,
            status: status,
            image_url: url,
            image_name: image_name,
          };

          const banner = Banner.create(body);

          return res.status(201).json(banner);
        })
        .catch((err) => {
          return next({ name: 'FailedUpload' });
        });
    }
  });
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
    await deleteImage(isFound.image_name);
    await Banner.destroy({ where: { id: id } });
    return res.status(200).json({ message: 'Banner has been deleted' });
  } catch (err) {
    next(err);
  }
};
