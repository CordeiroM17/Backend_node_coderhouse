import { forgotPasswordService } from '../services/forgotPassword.service.js';

export const forgotPasswordController = {
  forgotPasswordGet: async function (req, res) {
    try {
      return res.render('forgotPassword');
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        msg: 'the page is not found',
        data: { error },
      });
    }
  },

  forgotPasswordPost: async function (req, res) {
    try {
      const { email } = req.body;
      await forgotPasswordService.createRecoverCode(email);
      return res.render('checkInYourEmail');
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        msg: 'the page is not found',
        data: { error },
      });
    }
  },

  recoverPasswordGet: async function (req, res) {
    try {
      const { code, email } = req.query;
      await forgotPasswordService.foundRecoverCode(code, email);
      return res.render('recoverPassword', { code, email });
    } catch (error) {
      return res.status(400).render('errorPage', { msg: 'Page not found, please try later' });
    }
  },

  recoverPasswordPost: async function (req, res) {
    try {
      /* El code y el email vienen con un slash al final */
      const { code, email, password } = req.body;
      /* Hacer que la contraseña se pueda cambiar */
      await forgotPasswordService.putNewPassword(code, email, password);
      /* Enviar al login */
      res.redirect('/');
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        msg: 'could not exit the session',
        data: { error },
      });
    }
  },
};