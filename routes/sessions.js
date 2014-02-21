var users = require('../data/models/users');
var loadUser = require('./middleware/load_user');
var isLoggedInAction = require('./middleware/isLoggedInAction');

module.exports = function(app){
  app.get('/session/new', isLoggedInAction, function(req, res){
      
        res.render("session/new", {title:"Log in"});     
      
   });
   
  app.post('/session', function(req, res) {
    users.findOne({name: req.body.name, password: req.body.password},
      function(err, user) {
        if (err) {
          return next(err);
        }
        if (user) {
          req.session.user = user;
          res.redirect('/user');
        } else {
        res.redirect('/session/new');
        }
      });
    });

  app.del('/session', function(req, res, next) {
    req.session.destroy();
    res.redirect('/user');
  });


}