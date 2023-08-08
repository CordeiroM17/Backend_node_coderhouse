export const userController = {
  registerGet: async function (req, res) {
    try {
      return res.render('registerForm', {});
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        msg: 'the page is not found',
        data: { error },
      });
    }
  },

  registerPost: async function (req, res) {
    try {
      if (!req.user) {
        return res.json({ error: 'something went wrong' });
      }

      req.session.user = {
        email: req.user.email,
        firstName: req.user.firstName,
        rol: req.user.rol,
        _id: req.user._id.toString(),
      };
      return res.redirect('/');
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        msg: 'the user could not be created',
        data: { error },
      });
    }
  },

  loginGet: async function (req, res) {
    try {
      return res.render('loginForm', {});
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        msg: 'the page is not found',
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
        rol: req.user.rol,
        _id: req.user._id.toString(),
      };

      return res.redirect('/products');
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        msg: 'check your email and paswword',
        data: { error },
      });
    }
  },

  logout: async function (req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).render('error', { error: 'no se pudo cerrar su session' });
        }
        return res.redirect('/');
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        msg: 'could not exit the session',
        data: { error },
      });
    }
  },
  failRegister: async function (req, res) {
    return res.status(400).render('errorPage', { msg: 'No se pudo registrar, puede que su correo este duplicado' });
  },
  failLogin: async function (req, res) {
    return res.status(400).render('errorPage', { msg: 'No se puedo ingresar, compruebe su email y contraseña' });
  },
  sessionInformation: async function (req, res) {
    return res.send(JSON.stringify(req.session));
  },
  githubLogin: async function (req, res) {
    try {
      req.session.user = req.user;
      // Successful authentication, redirect products
      return res.redirect('/products');
    } catch (error) {
      return res.status(400).render('errorPage', { msg: 'El email o contraseña incorrecta' });
    }
  },
};
