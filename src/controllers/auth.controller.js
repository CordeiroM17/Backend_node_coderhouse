import CustomError from '../services/errors/customError.js';
import EErrors from '../services/errors/enums.js';
import { generateUserErrorInfo } from '../services/errors/info.js';

export const authController = {
  registerGet: async function (req, res) {
    try {
      return res.status(200).render('registerForm');
    } catch (error) {
      return res.status(500).json({
        status: 'Error',
        msg: 'Something went wrongd',
        data: { error },
      });
    }
  },

  registerPost: async function (req, res) {
    try {
      if (!req.user) {
        return res.status(500).json({ error: 'Something went wrong' });
      }

      req.session.user = {
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        rol: req.user.rol,
        cart: req.user.cart,
        _id: req.user._id.toString(),
      };

      return res.status(200).redirect('/auth/login');
    } catch (error) {
      CustomError.createError({
        name: 'User creation error',
        cause: generateUserErrorInfo(req.user),
        message: 'Error trying to create user',
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
  },

  loginGet: async function (req, res) {
    try {
      return res.status(200).render('loginForm', {});
    } catch (error) {
      return res.status(500).json({
        status: 'Error',
        msg: 'Something went wrong',
        data: { error },
      });
    }
  },

  loginPost: async function (req, res) {
    try {
      if (!req.user) {
        return res.json({ error: 'invalid credentials' });
      }

      req.session.user = {
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        rol: req.user.rol,
        cart: req.user.cart,
        _id: req.user._id.toString(),
      };

      return res.status(200).redirect('/products');
    } catch (error) {
      CustomError.createError({
        name: 'User login error',
        cause: generateUserErrorInfo(req.user),
        message: 'Error trying to login a user',
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
  },

  logout: async function (req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).render('error', { error: 'no se pudo cerrar su session' });
        }
        return res.status(200).redirect('/');
      });
    } catch (error) {
      CustomError.createError({
        name: 'Logout Error',
        cause: error,
        message: 'Error trying to logout',
        code: EErrors.LOGOUT_ERROR,
      });
    }
  },

  failRegister: async function (req, res) {
    return res.status(400).render('errorPage', { msg: 'No se pudo registrar, puede que su correo este duplicado', backLink: '/auth/register' });
  },

  failLogin: async function (req, res) {
    return res.status(400).render('errorPage', { msg: 'No se pudo ingresar, compruebe su email y contraseña', backLink: '/auth/login' });
  },

  githubLogin: async function (req, res) {
    try {
      req.session.user = req.user;
      // Successful authentication, redirect products
      return res.status(200).redirect('/products');
    } catch (error) {
      return res.status(400).render('errorPage', { msg: 'No se pudo ingresar, intente mas tarde', backLink: '/' });
    }
  },
};
