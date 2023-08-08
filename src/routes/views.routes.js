import express from 'express';
import { productService } from '../services/product.service.js';
import { cartsService } from '../services/carts.service.js';
import { checkAdmin, checkUser } from '../middleware/auth.js';
export const viewsRouter = express.Router();

viewsRouter.get('/', (req, res) => {
  return res.status(200).render('home');
});

viewsRouter.get('/register', (req, res) => {
  return res.status(200).render('registerForm');
});

viewsRouter.get('/products', checkUser, async (req, res) => {
  const { page, limit } = req.query;
  try {
    let products = await productService.getProducts(page, limit);
    const productsMap = products.docs.map((prod) => {
      return {
        id: prod._id.toString(),
        title: prod.title,
        description: prod.description,
        price: prod.price,
        thumbnail: prod.thumbnail,
        code: prod.code,
        stock: prod.stock,
      };
    });
    return res.status(200).render('products', {
      status: 'success',
      payload: productsMap,
      firstName: req.session.user?.firstName,
      rol: req.session.user?.rol,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).render('errorPage', { msg: 'Please Login' });
  }
});

viewsRouter.get('/carts/:cid', checkUser, async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await cartsService.getCartById(cartId);
    const productsMap = cart.productos.map((prod) => {
      return {
        id: prod._id.toString(),
        title: prod.idProduct.title,
        description: prod.idProduct.description,
        price: prod.idProduct.price,
        quantity: prod.quantity,
      };
    });
    console.log(productsMap);
    return res.status(200).render('carts', { productsMap });
  } catch (error) {
    return res.status(400).render('errorPage', { msg: 'Please Login' });
  }
});

viewsRouter.get('/administracion', checkAdmin, (req, res) => {
  res.send('esto solo lo puede ver el admin');
});
