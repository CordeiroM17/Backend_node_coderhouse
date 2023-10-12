import express from 'express';
import { productsController } from '../controllers/products.controller.js';
import { checkAdmin, checkUser } from '../middleware/auth.js';
export const productsRouter = express.Router();

/* Revisar que cosas puede hacer el usuario y cuales el admin y cuales el premium */
productsRouter.get('/', checkUser, productsController.getAllProducts);

productsRouter.post('/', checkUser,  checkAdmin, productsController.createOneProduct);

productsRouter.get('/:pid', checkUser, productsController.showOneProduct);

productsRouter.delete('/:pid', checkUser, checkAdmin, productsController.deleteOneProduct);

productsRouter.put('/:pid', checkUser, checkAdmin, productsController.updateOneProduct);
