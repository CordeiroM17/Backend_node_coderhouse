import express from 'express';
import { productsController } from '../controllers/products.controller.js';
export const productsRouter = express.Router();

productsRouter.get('/', productsController.getAllProducts); /* X */

productsRouter.get('/:pid', productsController.showOneProduct); /* X */

productsRouter.delete('/:pid', productsController.deleteOneProduct);

productsRouter.post('/', productsController.createOneProduct);  /* X */

productsRouter.put('/:pid', productsController.updateOneProduct); /* X */
