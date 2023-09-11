import { entorno } from '../dirname.js';
import { connectMongo } from '../utils/connections.js';

export let carts;
export let products;
export let users;
export let tickets;
export let codes;

export async function factory() {
  switch (entorno.PERSISTENCE) {
    case 'MONGO':
      console.log('Mongo connect');
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

      console.log(Carts);
      console.log(Products);
      console.log(Users);
      console.log(Tickets);
      console.log(ForgotPassword);

      break;
    case 'MEMORY':
      console.log('Persistence with Memory');
      /* const { default: ContactsMemory } = await import('./memory/contacts.memory.js');
      
          Contacts = ContactsMemory; */

      break;
    default:
      break;
  }
}
