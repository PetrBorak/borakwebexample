function isLoggedInAction(req, res, next) {
  if (req.session.user) {
    res.render('session/logout');
  } else {
    next();
  }
}
module.exports = isLoggedInAction;
