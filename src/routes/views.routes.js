import express from 'express';
import { checkAdmin, checkUser } from '../middleware/auth.js';
import { viewController } from '../controllers/views.controller.js';
export const viewsRouter = express.Router();

viewsRouter.get('/', viewController.getHomePage);

viewsRouter.get('/register', viewController.getRegisterPage);

viewsRouter.get('/products', checkUser, viewController.getProductPage);

viewsRouter.get('/carts/:cid', checkUser, viewController.getCartByIdPage);

viewsRouter.get('/admin', checkAdmin, viewController.admin);
