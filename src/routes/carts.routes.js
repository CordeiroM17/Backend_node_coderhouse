import express from 'express';
import { cartsController } from '../controllers/carts.controller.js';
export const cartsRouter = express.Router();

cartsRouter.get('/:cid', cartsController.showOneCart);

cartsRouter.post('/', cartsController.createOneCart);

cartsRouter.post('/:cid/products/:pid', cartsController.addProductToCart);

cartsRouter.delete('/:cid/products/:pid', cartsController.removeOneProductFromCart);

cartsRouter.delete('/:cid', cartsController.removeProductFromCart);

cartsRouter.put('/:cid/products/:pid', cartsController.updateProductQuantity);

cartsRouter.put('/:cid', cartsController.addArrayProducts);
