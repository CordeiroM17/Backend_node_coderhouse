import { tickets, users } from '../DAO/factory.js';
import { entorno } from '../dirname.js';
import { transport } from '../utils/transportNodemailer.js';

class TicketsService {
  async createTicket(cartId, products) {
    const user = await users.findUserByCart(cartId);
    const { email } = user;

    const finalPrice = this.calculateTotal(products);

    // Sacar id del ticket para ponerselo como code
    const ticket = await tickets.createTicket(email, products, finalPrice);

    this.sendEmail(email);
    return ticket;
  }

  calculateTotal = (prodArray) => {
    let finalPrice = 0;
    for (let i = 0; i < prodArray.length; i++) {
      const prod = prodArray[i];
      finalPrice = finalPrice + prod.quantity * prod.price;
    }
    return finalPrice;
  };

  async sendEmail(email) {
    await transport.sendMail({
      from: entorno.GOOGLE_EMAIL,
      to: email,
      subject: 'Tu compra fue un exito',
      html: `
            <div>
              <h1>Le dejamos el detalle de su compra a continuacion:</h1>
            </div>
            `,
    });
  }
}

export const ticketsService = new TicketsService();
