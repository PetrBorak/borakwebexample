function notLoggedIn(req, res, next) {
if (!req.session.user) {
res.render('session/new');
} else {
next();
}
}
module.exports = notLoggedIn;
