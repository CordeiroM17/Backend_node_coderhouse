import { entorno } from '../dirname.js';
import { cartsService } from '../services/carts.service.js';
import CustomError from '../services/errors/customError.js';
import EErrors from '../services/errors/enums.js';
import { productService } from '../services/products.service.js';
import { ticketsService } from '../services/tickets.service.js';

export const viewController = {
  getHomePage: async function (req, res) {
    try {
      return res.status(200).render('home');
    } catch (error) {
      CustomError.createError({
        name: 'Page not found',
        cause: 'Page not found',
        message: 'Page not found',
        code: EErrors.PAGE_NOT_FOUND,
      });
    }
  },

  getRegisterPage: async function (req, res) {
    try {
      return res.status(200).render('registerForm');
    } catch (error) {
      CustomError.createError({
        name: 'Page not found',
        cause: 'Page not found',
        message: 'Page not found',
        code: EErrors.PAGE_NOT_FOUND,
      });
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
          thubmail: prod.thubmail,
          code: prod.code,
          stock: prod.stock,
        };
      });
      return res.status(200).render('products', {
        status: 'success',
        payload: productsMap,
        firstName: req.session.user?.firstName,
        rol: req.session.user?.rol,
        cart: req.session.user?.cart,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        url: entorno.API_URL
      });
    } catch (error) {
      CustomError.createError({
        name: 'Page not found',
        cause: 'Page not found',
        message: 'Page not found',
        code: EErrors.PAGE_NOT_FOUND,
      });
    }
  },

  getCartByIdPage: async function (req, res) {
    const cartId = req.params.cid;
    try {
      const cart = await cartsService.getCartById(cartId);
      let totalAmount = 0 
      const productsMap = cart.productos.map((prod) => {
        totalAmount = totalAmount + prod.idProduct.price * prod.quantity
        return {
          id: prod._id.toString(),
          title: prod.idProduct.title,
          thubmail: prod.idProduct.thubmail,
          description: prod.idProduct.description,
          price: prod.idProduct.price,
          quantity: prod.quantity,
        };
      });
      const cartEmpty = productsMap.length === 0;
      return res.status(200).render('carts', { productsMap, cartEmpty, cartId, totalAmount });
    } catch (error) {
      CustomError.createError({
        name: 'Page not found',
        cause: 'Page not found',
        message: 'Page not found',
        code: EErrors.PAGE_NOT_FOUND,
      });
    }
  },

  admin: async function (req, res) {
    res.send('esto solo lo puede ver el admin');
  },

  getTicketIdPage: async function (req, res) {
    const ticketId = req.params.tid;
    try {
      const ticketFound = await ticketsService.getTicket(ticketId);
      return res.status(200).json({
        status: "Success",
        msg: 'Este es tu ticket',
        data: ticketFound
      })
    } catch (error) {
      CustomError.createError({
        name: 'Page not found',
        cause: 'Page not found',
        message: 'Page not found',
        code: EErrors.PAGE_NOT_FOUND,
      });
    }
  }
};
