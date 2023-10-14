import express from 'express';
import { productsController } from '../controllers/products.controller.js';
import { checkAdmin, checkUser } from '../middleware/auth.js';
import { upload } from '../middleware/multer.js';
export const productsRouter = express.Router();

productsRouter.get('/', checkUser, productsController.getAllProducts);

productsRouter.post('/', checkUser, checkAdmin, upload.single('thubmail'), productsController.createOneProduct);

productsRouter.get('/:pid', checkUser, productsController.showOneProduct);

productsRouter.delete('/:pid', checkUser, checkAdmin, productsController.deleteOneProduct);

productsRouter.put('/:pid', checkUser, checkAdmin, productsController.updateOneProduct);
