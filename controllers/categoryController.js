const { Category } = require('../models')

class CategoryController {
  static findAll(req, res, next) {
    Category
      .findAll()
      .then(categories => {
        res.status(200).json(categories)
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal Server Error' })
      })
  }

  static findByPk(req, res, next) {
    Category
      .findByPk(+req.params.id)
      .then(category => {
        category ? res.status(200).json(category) :
        res.status(404).json({ message: 'Category Not Found' })
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal Server Error' })
      })
  }

  static create(req, res, next) {
    const { name } = req.body
    Category.create({ name })
      .then(category => {
        const { id, name } = category
        res.status(201).json({ id, name })
      })
      .catch(err => {
        const message = err.errors ? err.errors.map(e => e.message) : 'Internal Server Error'

        err.errors ? res.status(400).json({ message }) :
        res.status(500).json({ message })
      })
  }

  static update(req, res, next) {
    const { name } = req.body
    Category
      .update({ name }, {
        where: { id: +req.params.id },
        returning: true
      })
      .then(category => {
        if (!category[1][0]) res.status(404).json({ message: 'Category Not Found' })
        else {
          const { id, name } = category[1][0].dataValues
          res.status(200).json({ id, name })
        }
      })
      .catch(err => {
        const message = err.errors ? err.errors.map(e => e.message) : 'Internal Server Error'

        err.errors ? res.status(400).json({ message }) :
        res.status(500).json({ message })
      })
  }

  static delete(req, res, next) {
    Category
      .destroy({ where: { id: +req.params.id }, returning: true })
      .then(category => {
        category ?
          res.status(200).json({ message: 'Category success deleted!' }) :
          res.status(404).json({ message: 'Category Not Found' })
      })
      .catch(err => {
        res.status(500).json({ message: 'Internal Server Error' })
      })
  }
}

module.exports = CategoryController