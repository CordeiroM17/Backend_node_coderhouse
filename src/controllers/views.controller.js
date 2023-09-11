import CustomError from '../services/errors/customError.js';
import EErros from '../services/errors/enums.js';
import { productService } from '../services/products.service.js';
import { generateProduct } from '../utils/generateFakeProduct.js';

export const viewController = {
  getHomePage: async function (req, res) {
    try {
      return res.status(200).render('home');
    } catch (error) {
      return res.status(400).render('errorPage', { msg: 'Page not found, please try later' });
    }
  },

  getRegisterPage: async function (req, res) {
    try {
      return res.status(200).render('registerForm');
    } catch (error) {
      return res.status(400).render('errorPage', { msg: 'Page not found, please try later' });
    }
  },

  getProductPage: async function (req, res) {
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
  },

  getCartByIdPage: async function (req, res) {
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
  },

  admin: async function (req, res) {
    res.send('esto solo lo puede ver el admin');
  },

  getHundredProducts: async function (req, res) {
    try {
      const prod = generateProduct();

      return res.status(201).json({
        status: 'success',
        msg: 'Take 100 products in 1 page',
        data: prod,
      });
    } catch (error) {
      CustomError.createError({
        name: 'Products get error',
        cause: '',
        message: 'Error trying to get a hundred products in one page',
        code: EErros.INVALID_TYPES_ERROR,
      });
    }
  },
};
