import express from 'express';
import { cartsController } from '../controllers/carts.controller.js';
import { checkCart, checkUser } from '../middleware/auth.js';
export const cartsRouter = express.Router();

cartsRouter.get('/:cid', checkUser, checkCart, cartsController.showOneCart);

cartsRouter.post('/:cid/purchase', checkUser, checkCart, cartsController.purchase);

cartsRouter.post('/', checkUser, checkCart, cartsController.createOneCart);

cartsRouter.post('/:cid/products/:pid', checkUser, checkCart, cartsController.addProductToCart);

cartsRouter.delete('/:cid/products/:pid', checkUser, checkCart, cartsController.removeOneProductFromCart);

cartsRouter.delete('/:cid', checkUser, checkCart, cartsController.removeAllProductsFromCart);

cartsRouter.put('/:cid/products/:pid', checkUser, checkCart, cartsController.updateProductQuantity);

cartsRouter.put('/:cid', checkUser, checkCart, cartsController.addArrayProducts);
