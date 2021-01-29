const { Banner } = require("../models");

exports.create = async (req, res, next) => {
  try {
    const data = {
      title: req.body.title,
      status: req.body.status,
      image_url: req.body.image_url
    };
    const banner = await Banner.create(data);
    res.status(201).json(banner);
  } catch (error) {
    next(error);
  }
};

exports.banners = async (req, res, next) => {
  try {
    const banners = await Banner.findAll();
    res.status(200).json(banners);
  } catch (error) {
    next(error);
  }
};

exports.banner = async (req, res, next) => {
  try {
    const id = req.params.id;
    const banner = await Banner.findByPk(id);
    banner ? res.status(200).json(banner) : next({ name: "NotFound", item:  "Banner"});
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = {
      title: req.body.title,
      status: req.body.status,
      image_url: req.body.image_url
    };
    const banner = await Banner.update(data, {
      where: { id },
      returning: true,
    });
    banner
      ? res.status(200).json(banner[1][0].dataValues)
      : next({ name: "NotFound", item:  "Banner"});
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const id = req.params.id;
    const banner = await Banner.findByPk(id);
    if (banner) {
      const deletedProduct = await Banner.destroy({ where: { id } });
      res.status(200).json({
        success: [`Banner with id: '${banner.id}' success to delete`],
      });
    } else {
      next({ name: "NotFound", item:  "Banner"});
    }
  } catch (error) {
    next(error);
  }
};
