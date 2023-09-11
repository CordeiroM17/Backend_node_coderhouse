import { transport } from '../utils/transportNodemailer.js';
import { entorno } from '../dirname.js';
import { codes } from '../DAO/factory.js';
import crypto from 'crypto';
import { usersService } from './users.service.js';

class ForgotPasswordService {
  async verifyDateExpire(expireDate) {
    if (Date.now > expireDate) {
      return res.render('errorPage', { msg: 'Este mensaje expiro. Vuelve a solicitar su contraseña. Solo tiene 1 hora desde que el email fue enviado' });
    }
  }

  async createRecoverCode(email) {
    const code = crypto.randomBytes(32).toString('hex');

    await codes.createPasswordRecover(email, code);

    this.sendEmail(email, code);
  }

  async sendEmail(email, code) {
    await transport.sendMail({
      from: entorno.GOOGLE_EMAIL,
      to: email,
      subject: '¡Aquí tienes tu nueva contraseña!',
      html: `
                <div>
                  <h1>Has solicitado restablecer tu contraseña, así que te dejamos el codigo para restablecer tu contraseña:</h1>
                  <h2>${code}</h2>
                  <a href='${entorno.API_URL}/password/recover-pass?code=${code}&email=${email}'>Restablecer mi contraseña</a>
                </div>
                `,
    });
  }

  async foundRecoverCode(code, email) {
    const { expire } = await codes.findCode(email, code);

    this.verifyDateExpire(expire);
  }

  async putNewPassword(code, email, password) {
    /* Volver a verificar si es el usuario y que nada este cambiado*/
    this.foundRecoverCode(code, email);

    /* Hashear pass y meterlo a la base */
    await usersService.changePassword(email, password);
  }
}

export const forgotPasswordService = new ForgotPasswordService();
