import winston from 'winston';
import { entorno } from '../dirname';

const loggerDev = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug', //debug => verbose => htpp => info => warn => error
      format: winston.format.colorize({ all: true }),
    }),
  ],
});

const loggerProd = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'info', //info => warn => error
      format: winston.format.colorize({ all: true }),
    }),
    new winston.transports.File({
      filename: './errors.log',
      level: 'error', //error
      format: winston.format.simple(),
    }),
  ],
});

export const addLogger = (req, res, next) => {
  if (entorno.MODE === 'DEV') {
    // Dev
    req.logger = loggerDev;
  } else {
    // Prod
    req.logger = loggerProd;
  }
  next();
};
