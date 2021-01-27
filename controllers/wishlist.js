const { Wishlist, User } = require("../models");

exports.create = async (req, res, next) => {
  try {
    const data = {
      UserId: req.user.id,
      ProdId: +req.body.ProdId,
    };
    console.log(data);
    const wishlist = await Wishlist.create(data, { w: 1 }, { returning: true });
    res.status(201).json(wishlist);
  } catch (error) {
    next(error);
  }
};

exports.wishlists = async (req, res, next) => {
  try {
    const wishlists = await Wishlist.findAll();
    res.status(200).json(wishlists);
  } catch (error) {
    next(error);
  }
};

exports.wishlistsUser = async (req, res, next) => {
  try {
    const wishlists = await Wishlist.findAll({ include: User });
    res.status(200).json(wishlists);
  } catch (error) {
    next(error);
  }
};

exports.wishlist = async (req, res, next) => {
  try {
    const id = req.params.id;
    const wishlist = await Wishlist.findByPk(id);
    wishlist
      ? res.status(200).json(wishlist)
      : next({ name: "NotFound", item: "Wishlist" });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = {
      UserId: req.user.id,
      ProdId: req.body.ProdId,
    };
    const wishlist = await Wishlist.update(data, {
      where: { id },
      returning: true,
    });
    wishlist
      ? res.status(200).json(wishlist[1][0].dataValues)
      : next({ name: "NotFound", item: "Wishlist" });
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const id = req.params.id;
    const wishlist = await Wishlist.findByPk(id);
    if (wishlist) {
      const deletedProduct = await Wishlist.destroy({ where: { id } });
      res.status(200).json({
        success: [`Wishlist with id: '${wishlist.id}' success to delete`],
      });
    } else {
      next({ name: "NotFound", item: "Wishlist" });
    }
  } catch (error) {
    next(error);
  }
};
