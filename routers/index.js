import express from 'express';
import Controller from '../controllers/controller.js';
import product from './product.js';

const router = express.Router();

router.get('/', Controller.home);

router.use('/product', product);

module.exports = router;