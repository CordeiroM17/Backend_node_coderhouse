import express from 'express';
import { productsController } from '../controllers/products.controller.js';
export const productsRouter = express.Router();

productsRouter.get('/', productsController.getAllProducts);

productsRouter.get('/:pid', productsController.showOneProduct);

productsRouter.delete('/:pid', productsController.deleteOneProduct);

productsRouter.post('/', productsController.createOneProduct);

productsRouter.put('/:pid', productsController.updateOneProduct);
