export function checkUser(req, res, next) {
  if (req.session.user.email) {
    return next();
  } else {
    return res.status(401).render('errorPage', { msg: 'please log in' });
  }
}

export function checkAdmin(req, res, next) {
  if (req.session.user.email && req.session.user.rol == 'admin') {
    return next();
  } else {
    return res.status(403).render('errorPage', { msg: 'please log in AS ADMIN!' });
  }
}
