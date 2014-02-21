
/*
 * GET users listing.
 */
var users = require('../data/models/users');
var loadUser = require('./middleware/load_user');
var notLoggedIn = require('./middleware/notLoggedIn');
var isLoggedIn = require('./middleware/isLoggedIn');

module.exports = function(app){
  

    
  app.get('/user', notLoggedIn, function(req, res){
  
    if(isLoggedIn(req,res)){
      var logged = true;
    }else{
      var logged = false;
    }
    
    users.find({},function(err,users){
      res.render("user/index", {title:"users", users: users, logged: logged});     
    });
   
  });

  app.get('/user/new',notLoggedIn, function(req, res){

    
  if(isLoggedIn(req,res)){
      var logged = true;
    }else{
      var logged = false;
    }
    
    
   res.render("user/new",{title:"New User",logged: logged});
  });
  app.get('/user/:name', notLoggedIn, loadUser, function(req, res){
    
    if(isLoggedIn(req,res)){
      var logged = true;
    }else{
      var logged = false;
    }
    
   res.render("user/profile",{title:"User profile", user: req.user,logged: logged});
  });
  
   app.post('/user', function(req, res){
    
   users.findOne({name: req.body.name}, function(err,user){
    if(user){
      return res.send("Conflict", 404);
    }
    users.create(req.body,function(err){
      res.redirect('/user');
    })
   })
  });

  app.del('/user/:name', loadUser, function(req, res){
    
   req.user.remove(function(err){
    res.redirect('/user');
   });
  });
  
}