import EErros from '../services/errors/enums.js';
import { logger } from '../utils/logger.js';

export default (error, req, res, next) => {
  logger.error(`${error.cause}`);

  switch (error.code) {
    case EErros.INVALID_TYPES_ERROR:
      res.status(400).send({ status: 'Error', error: error.name, cause: error.cause });
      break;
    case EErros.LOGOUT_ERROR:
      res.status(500).json({ status: 'Error', error: error.name, cause: error.cause });
      break;
    default:
      res.status(500).send({ status: 'Error', error: 'Unhandled error' });
      break;
  }
};
