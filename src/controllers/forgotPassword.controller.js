import CustomError from '../services/errors/customError.js';
import EErrors from '../services/errors/enums.js';
import { forgotPasswordService } from '../services/forgotPassword.service.js';

export const forgotPasswordController = {
  forgotPasswordGet: async function (req, res) {
    try {
      return res.status(200).render('forgotPassword');
    } catch (error) {
      CustomError.createError({
        name: 'Page not found',
        cause: error,
        message: 'Page not found',
        code: EErrors.PAGE_NOT_FOUND,
      });
    }
  },

  forgotPasswordPost: async function (req, res) {
    try {
      const { email } = req.body;
      await forgotPasswordService.createRecoverCode(email);
      return res.status(200).render('checkInYourEmail');
    } catch (error) {
      CustomError.createError({
        name: 'El usuario no existe',
        cause: error,
        message: 'El usuario no posee una cuenta, el correo puede usarse',
        code: EErrors.USER_NOT_EXIST,
      });
    }
  },

  recoverPasswordGet: async function (req, res) {
    try {
      const { code, email } = req.query;
      await forgotPasswordService.foundRecoverCode(code, email);
      return res.status(200).render('recoverPassword', { code, email });
    } catch (error) {
      CustomError.createError({
        name: 'Page not found',
        cause: error,
        message: 'Page not found',
        code: EErrors.PAGE_NOT_FOUND,
      });
    }
  },

  recoverPasswordPost: async function (req, res) {
    try {
      const { code, email, password } = req.body;

      await forgotPasswordService.putNewPassword(code, email, password);
      
      return res.redirect('/auth/login');
    } catch (error) {
      return res.status(500).json({
        status: 'Error',
        msg: 'Could not exit the session',
        data: { error },
      });
    }
  },
};
