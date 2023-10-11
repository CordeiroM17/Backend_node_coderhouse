import { transport } from '../utils/transportNodemailer.js';
import { entorno } from '../dirname.js';
import { codes, users } from '../DAO/factory.js';
import crypto from 'crypto';
import { authService } from './auth.service.js';

class ForgotPasswordService {
  async verifyDateExpire(expireDate) {
    if (Date.now > expireDate) {
      return res.render('errorPage', { msg: 'Este mensaje expiro. Vuelve a solicitar su contraseña. Solo tiene 1 hora desde que el email fue enviado', backLink: '/password/forgotPassword' });
    }
  }

  async createRecoverCode(email) {
    // Verificar si existe el usuario
    const userFound = await users.findUserByEmail(email);

    if(!userFound) {
      throw new Error('El usuario no existe')
    }

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
            <div style='text-align: center; align-items: center;'>
              <h1 style='font-weight: bold; text-transform: uppercase;'>Has solicitado restablecer tu contraseña</h1>
              <h2 style='font-weight: 200;'>Ingresa al siguiente link para poder cambiar tu contraseña</h2>
              <a
                href='${entorno.API_URL}/password/recover-pass?code=${code}&email=${email}'
                style='border: 2px solid #7FB3D5;
                padding: 10px;
                border-radius: 25px;
                margin: 10px 0;
            
                color: black;
                text-decoration: none;
            
                font-size: xx-large;
                text-align: center;'
              >Restablecer mi contraseña</a>
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
    await authService.changePassword(email, password);
  }
}

export const forgotPasswordService = new ForgotPasswordService();
