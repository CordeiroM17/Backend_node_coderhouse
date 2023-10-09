import { entorno } from '../dirname.js';
import { connectMongo } from '../utils/connections.js';
import { logger } from '../utils/logger.js';

export let carts;
export let products;
export let users;
export let tickets;
export let codes;

export async function factory() {
  switch (entorno.PERSISTENCE) {
    case 'MONGO':
      logger.info('Mongo connect');
      connectMongo();
      const { default: CartsMongo } = await import('./mongo/carts.mongo.js');
      const { default: ProductsMongo } = await import('./mongo/products.mongo.js');
      const { default: UsersMongo } = await import('./mongo/users.mongo.js');
      const { default: TicketsMongo } = await import('./mongo/tickets.mongo.js');
      const { default: ForgotPasswordMongo } = await import('./mongo/forgotPassword.mongo.js');

      const Carts = CartsMongo;
      const Products = ProductsMongo;
      const Users = UsersMongo;
      const Tickets = TicketsMongo;
      const ForgotPassword = ForgotPasswordMongo;

      carts = new Carts();
      products = new Products();
      users = new Users();
      tickets = new Tickets();
      codes = new ForgotPassword();

      break;
    case 'MEMORY':
      logger.info('Persistence with Memory');
      
      /* No se utilizo */

      break;
    default:
      break;
  }
}
