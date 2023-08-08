import express from 'express';
import { productsController } from '../controllers/product.controller.js';
export const productsRouter = express.Router();

productsRouter.get('/', productsController.getAllProducts);

productsRouter.get('/:pid', productsController.showOneProduct);

productsRouter.delete('/:id', productsController.deleteOneProduct);

productsRouter.post('/', productsController.createOneProduct);

productsRouter.put('/:id', productsController.updateOneProduct);
