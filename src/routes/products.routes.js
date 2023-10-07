import express from 'express';
import { productsController } from '../controllers/products.controller.js';
import { checkUser } from '../middleware/auth.js';
export const productsRouter = express.Router();

productsRouter.get('/', checkUser, productsController.getAllProducts);

productsRouter.post('/', checkUser, productsController.createOneProduct);

productsRouter.get('/:pid', checkUser, productsController.showOneProduct);

productsRouter.delete('/:pid', checkUser, productsController.deleteOneProduct);

productsRouter.put('/:pid', checkUser, productsController.updateOneProduct);
