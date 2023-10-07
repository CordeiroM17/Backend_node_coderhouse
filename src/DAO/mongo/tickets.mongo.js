import { TicketsModel } from './models/tickets.model.js';

export default class Tickets {
  constructor() {}

  createTicket = async (email, prodArray, finalPrice) => {
    return await TicketsModel.create({
      cart: prodArray,
      amount: finalPrice,
      purchaser: email,
    });
  };
}
