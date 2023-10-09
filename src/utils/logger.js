import winston from 'winston';
import { entorno } from '../dirname.js';

export let logger;

if (entorno.MODE === 'DEV') {
  // Dev
  logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'debug', //debug => verbose => htpp => info => warn => error
        format: winston.format.colorize({ all: true }),
      }),
    ],
  });
} else {
  // Prod
  logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.colorize({ all: true }),
      }),
      new winston.transports.File({
        filename: './logs.log',
        level: 'warn',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
          })
        ),
      }),
    ],
  });
}
