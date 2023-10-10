import CustomError from '../services/errors/customError.js';
import EErrors from '../services/errors/enums.js';
import { ticketsService } from '../services/tickets.service.js';

export function checkUser(req, res, next) {
  try {
    if (req.session?.user?.email == undefined) {
      throw new Error('El usuario no esta logeado');
    } else {
      return next();
    }
  } catch (error) {
    CustomError.createError({
      name: 'Usuario no logeado',
      cause: 'El usuario no ingreso su correo o constraseña',
      message: 'El usuario que intento ingresar no esta logeado',
      code: EErrors.USER_NOT_LOGGED,
    });
  }
}

export function checkAdmin(req, res, next) {
  try {
    if (req.session.user.email && req.session.user.rol == 'admin') {
      return next();
    } else {
      throw new Error('El usuario no es administrador');
    }
  } catch (error) {
    CustomError.createError({
      name: 'El usuario no es administrador',
      cause: 'El usuario no es administrador',
      message: 'El usuario no es administrador',
      code: EErrors.USER_NOT_ADMIN,
    });
  }
}

export async function checkCart(req, res, next) {
  const cartUser = req.session.user.cart;
  const cartParams = req.params.cid;
  try {
    if (cartUser === cartParams) {
      next();
    } else {
      throw new Error('No es el carrito del usuario');
    }
  } catch (error) {
    CustomError.createError({
      name: 'No es el carrito del usuario',
      cause: 'No es el carrito del usuario',
      message: 'El usuario intento acceder a un carrito que no es de el',
      code: EErrors.USER_NOT_CART,
    });
  }
}

export async function checkTicket(req, res, next) {
  const user = req.session.user;
  const ticketId = req.params.tid;
  try {
    const { purchaser } = await ticketsService.getTicket(ticketId);
    if (purchaser == user.email) {
      next();
    } else {
      throw new Error('Este no es el ticket del usuario');
    }
  } catch (error) {
    CustomError.createError({
      name: 'Este no es el ticket del usuario',
      cause: 'Este no es el ticket del usuario',
      message: 'El usuario intento acceder a un ticket que no es de el',
      code: EErrors.USER_NOT_TICKET,
    });
  }
}
