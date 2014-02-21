function isLoggedIn(req, res, next) {
return (req.session.user)
}
module.exports = isLoggedIn;
