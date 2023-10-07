import express from 'express';
import { cartsController } from '../controllers/carts.controller.js';
import { checkUser } from '../middleware/auth.js';
export const cartsRouter = express.Router();

cartsRouter.get('/:cid', checkUser, cartsController.showOneCart);

cartsRouter.post('/:cid/purchase', checkUser, cartsController.purchase);

cartsRouter.post('/', checkUser, cartsController.createOneCart);

cartsRouter.post('/:cid/products/:pid', checkUser, cartsController.addProductToCart);

cartsRouter.delete('/:cid/products/:pid', checkUser, cartsController.removeOneProductFromCart);

cartsRouter.delete('/:cid', checkUser, cartsController.removeAllProductsFromCart);

cartsRouter.put('/:cid/products/:pid', checkUser, cartsController.updateProductQuantity);

cartsRouter.put('/:cid', checkUser, cartsController.addArrayProducts);
