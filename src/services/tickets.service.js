import { tickets, users } from '../DAO/factory.js';
import { entorno } from '../dirname.js';
import { transport } from '../utils/trasportNodemailer.js';

class TicketsService {
  async createTicket(cartId, products) {
    const user = await users.findUserByCart(cartId);
    const { email } = user;
    const ticket = await tickets.createTicket(email, products);

    this.sendEmail(email /* , ticket */);
  }

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
