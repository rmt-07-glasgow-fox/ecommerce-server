import express from 'express';
import ProductController from '../controllers/productController.js';

const router = express.Router();

router.post('/', ProductController.createProduct);

module.exports = router;