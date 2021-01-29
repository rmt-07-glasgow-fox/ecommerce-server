const { User, Product } = require ('../models/index')

class ProductController {
  static getProduct (req, res, next) {
    Product.findAll({
      order: [
        ['id', 'ASC']
      ]
    })
      .then (data => {
        res.status (200).json (data)
      })
      .catch (err => {
        next (err)
      })
  }

  static getOneProduct (req, res, next) {
    Product.findByPk (+req.params.id)
      .then (data => {
        res.status (200).json (data)
      })
      .catch (err => {
        next (err)
      })
  }

  static postProduct (req, res, next) {
    const obj = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }
    Product.create (obj)
      .then (data => {
        res.status (201).json (data)
      })

      .catch (err => {
        next (err)
      })
  }

  static async patchProductAndUpdateBalance (req, res, next) {
    try {
      const checkBalance = await User.findByPk(req.user)
      if (checkBalance.balance < +req.body.totalPrice) {
        return next ({name: 'Not enough balance'})
      } else {
        let currentProduct = await Product.findByPk(+req.params.id)
        let toBeUpdatedStock = currentProduct.stock - (+req.body.quantity)
        const obj = {
          stock: toBeUpdatedStock
        }
        let data = await Product.update (obj, {
          where: {
            id: +req.params.id
          },
          returning: true
        })
        let isSuccess = data[0]
        let dataObj = data[1]
        if (isSuccess === 1) {
          res.status(200).json (dataObj[0])
        } else {
          next ({name: 'Error not found'})
        }
      }  
    } catch (err) {
      next (err)
    }
  }

  static putProduct (req, res, next) {
    const obj = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }
    Product.update (obj, {
      where: {
        id: +req.params.id
      },
      returning: true
    })
    .then (data => {
      let isSuccess = data[0]
      let dataObj = data[1]
      if (isSuccess === 1) {
        res.status(200).json (dataObj[0])
      } else {
        next ({name: 'Error not found'})
      }
    })
    .catch (err => {
      next (err)
    })
  }

  static deleteProduct (req, res, next) {
    Product.destroy ({
      where: {
        id: +req.params.id
      }
    })
    .then (data => {
      if (data === 1) {
        res.status(200).json ({message: 'Product deleted successfully'})
      } else {
        next ({name: 'Error not found'})
      }

    })
    .catch (err => {
      next (err)
    })
  }
}

module.exports = ProductController