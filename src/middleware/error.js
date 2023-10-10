import EErrors from '../services/errors/enums.js';
import { logger } from '../utils/logger.js';

export function errorHandler(error, req, res, next) {
  switch (error.code) {
    case EErrors.INVALID_TYPES_ERROR:
      logger.warn(`${error.cause}`);
      res.status(400).render('errorPage', { msg: 'No se pudo ingresar, compruebe su email y contraseña', backLink: '/' });
      break;
    case EErrors.LOGOUT_ERROR:
      logger.error(`${error.cause}`);
      res.status(500).send({ status: 'Error', error: error.name, cause: error.cause });
      break;
    case EErrors.PAGE_NOT_FOUND:
      logger.warn(`${error.cause}`);
      res.status(404).render('errorPage', { msg: 'Page not found', backLink: '/' });
      break;
    case EErrors.USER_NOT_LOGGED:
      logger.warn(`${error.cause}`);
      res.status(401).render('errorPage', { msg: 'Porfavor logeese para continuar', backLink: '/auth/login' });
      break;
    case EErrors.USER_NOT_ADMIN:
      logger.warn(`${error.cause}`);
      res.status(401).render('errorPage', { msg: 'Porfavor ingrese como ADMINISTRADOR', backLink: '/products' });
      break;
    case EErrors.USER_NOT_CART:
      logger.warn(`${error.cause}`);
      res.status(401).json({ status: 'Error', error: error.name, cause: error.cause })
      break;
    case EErrors.USER_NOT_EXIST:
      logger.warn(`${error.cause}`);
      res.status(401).json({ status: 'Error', error: error.name, cause: error.cause })
      break;
    case EErrors.USER_NOT_TICKET:
      logger.warn(`${error.cause}`);
      res.status(401).json({ status: 'Error', error: error.name, cause: error.cause })
      break;
    default:
      logger.error(`${error.cause}`);
      res.status(500).json({ status: 'Error', error: 'Unhandled error' });
      break;
  }
}
