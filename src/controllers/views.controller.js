import CurrentDTO from '../dto/current.dto.js';
import { cartsService } from '../services/carts.service.js';
import CustomError from '../services/errors/customError.js';
import EErrors from '../services/errors/enums.js';
import { productService } from '../services/products.service.js';
import { ticketsService } from '../services/tickets.service.js';
import { usersService } from '../services/users.service.js';

export const viewController = {
  getRealTimeProducts: async function (req, res) {
    try {
      const products = await productService.getProducts();

      let cart = req.session.user?.cart;

      let allProducts = products.docs.map((prod) => {
        return {
          id: prod._id.toString(),
          title: prod.title,
          thubmail: prod.thubmail,
          price: prod.price,
          code: prod.code,
          stock: prod.stock,
        };
      });

      return res.render('realTimeProducts', { allProducts, cart });
    } catch (error) {
      CustomError.createError({
        name: 'Page not found',
        cause: error,
        message: 'Page not found',
        code: EErrors.PAGE_NOT_FOUND,
      });
    }
  },

  getProfile: async function (req, res) {
    let allUser;
    try {
      const currentDto = new CurrentDTO(req.session.user);
      let { id, email, name, rol, age, cart } = currentDto;

      // Asigna a userRol el valor que tiene rol
      const userRol = rol;
      // Cambia el valor de rol a un boleando para poder usarlo en handlebars
      if (rol == 'admin') {
        rol = true;
        allUser = await usersService.getAllUsers();
      } else {
        rol = false;
      }

      return res.status(200).render('profile', { id, email, name, age, rol, cart, userRol, allUser });
    } catch (error) {
      CustomError.createError({
        name: 'Page not found',
        cause: error,
        message: 'Page not found',
        code: EErrors.PAGE_NOT_FOUND,
      });
    }
  },

  getHomePage: async function (req, res) {
    try {
      return res.status(200).render('home');
    } catch (error) {
      CustomError.createError({
        name: 'Page not found',
        cause: error,
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
        cause: error,
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

      let rol;
      if (req.session.user?.rol == 'admin') {
        rol = true;
      } else {
        rol = false;
      }

      return res.status(200).render('products', {
        status: 'success',
        payload: productsMap,
        firstName: req.session.user?.firstName,
        rol: rol,
        cart: req.session.user?.cart,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
      });
    } catch (error) {
      CustomError.createError({
        name: 'Page not found',
        cause: error,
        message: 'Page not found',
        code: EErrors.PAGE_NOT_FOUND,
      });
    }
  },

  getCartByIdPage: async function (req, res) {
    const cartId = req.params.cid;
    try {
      const cart = await cartsService.getCartById(cartId);
      let totalAmount = 0;
      const productsMap = cart.productos.map((prod) => {
        totalAmount = totalAmount + prod.idProduct.price * prod.quantity;
        return {
          id: prod.idProduct._id.toString(),
          title: prod.idProduct.title,
          thubmail: prod.idProduct.thubmail,
          description: prod.idProduct.description,
          price: prod.idProduct.price,
          quantity: prod.quantity,
        };
      });

      

      const cartEmpty = productsMap.length === 0;

      let rol;
      if (req.session.user?.rol == 'admin') {
        rol = true;
      } else {
        rol = false;
      }

      return res.status(200).render('carts', { productsMap, cartEmpty, cartId, totalAmount, rol });
    } catch (error) {
      CustomError.createError({
        name: 'Page not found',
        cause: error,
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
        status: 'Success',
        msg: 'Este es tu ticket',
        data: ticketFound,
      });
    } catch (error) {
      CustomError.createError({
        name: 'Page not found',
        cause: error,
        message: 'Page not found',
        code: EErrors.PAGE_NOT_FOUND,
      });
    }
  },
};
