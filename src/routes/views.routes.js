import express from 'express';
import { checkAdmin, checkCart, checkTicket, checkUser } from '../middleware/auth.js';
import { viewController } from '../controllers/views.controller.js';
export const viewsRouter = express.Router();

viewsRouter.get('/', viewController.getHomePage);

viewsRouter.get('/register', viewController.getRegisterPage);

viewsRouter.get('/products', checkUser, viewController.getProductPage);

viewsRouter.get('/carts/:cid', checkUser, checkCart, viewController.getCartByIdPage);

viewsRouter.get('/admin', checkUser, checkAdmin, viewController.admin);

viewsRouter.get('/ticket/:tid', checkUser, checkTicket, viewController.getTicketIdPage);

viewsRouter.get('/profile', checkUser, viewController.getProfile);

viewsRouter.get('/realtimeproducts', checkUser, checkAdmin, viewController.getRealTimeProducts);
