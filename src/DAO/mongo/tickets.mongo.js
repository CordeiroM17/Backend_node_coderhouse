import { TicketsModel } from './models/tickets.model.js';

export default class Tickets {
  constructor() {}

  calculateTotal = (prodArray) => {
    let finalPrice = 0
    for (let i = 0; i < prodArray.length; i++) {
      const prod = prodArray[i];
      finalPrice = finalPrice + prod.quantity * prod.price;
    }
    return finalPrice;
  };

  createTicket = async (email, prodArray) => {
    const finalPrice = this.calculateTotal(prodArray);
    await TicketsModel.create({
      cart: prodArray,
      code: 'aaa',
      amount: finalPrice,
      purchaser: email,
    });
  };
}
