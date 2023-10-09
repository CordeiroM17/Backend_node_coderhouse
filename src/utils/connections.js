import { connect } from 'mongoose';
import { entorno } from '../dirname.js';
import { logger } from './logger.js';
export async function connectMongo() {
  try {
    await connect(entorno.MONGO_URL);
    logger.info('Plug to mongo!');
  } catch (e) {
    logger.error(`${e}`);
    throw 'can not connect to the db';
  }
}
