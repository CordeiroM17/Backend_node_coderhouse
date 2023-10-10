import { TicketsModel } from './models/tickets.model.js';

export default class Tickets {
  constructor() {}

  getTicket = async (code) => {
    return await TicketsModel.findOne({ code: code });
  };

  createTicket = async (email, prodArray, finalPrice) => {
    return await TicketsModel.create({
      cart: prodArray,
      amount: finalPrice,
      purchaser: email,
    });
  };
}
