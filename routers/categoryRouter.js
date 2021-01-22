const express = require('express');
const categoryRouter = express.Router();
const { authentication, adminAuthorization, categoryAuthorization } = require('../middlewares/auth');
const CategoryController = require('../controllers/categoryController');

categoryRouter.use(authentication);
categoryRouter.use(adminAuthorization);

categoryRouter.post('/', CategoryController.postCategory);
categoryRouter.get('/', CategoryController.getCategory);

categoryRouter.use('/:categoryId', categoryAuthorization);

categoryRouter.delete('/:categoryId', CategoryController.deleteCategory);

module.exports = categoryRouter;