/*
 * GET home page.
 */
var aboutMe = require('../data/models/aboutMe');
var isLoggedIn = require('./middleware/isLoggedIn');
var blogArticles = require('../data/models/blogArticles');



module.exports = function(app){
  app.get('/', function(req, res){
    
    if(isLoggedIn(req,res)){
      var logged = true;
    }else{
      var logged = false;
    }
    
  aboutMe.findOne({}, function(err, aboutMe){
   blogArticles.find({lang:'en'}).sort({created: -1}).limit(1).execFind(function(err,blogArticle){
    res.render('index', {czechHref:"/cz",englishHref:"/", actualSite: "index", aboutMe: aboutMe, logged: logged, blog:blogArticle[0], title:"Petr Borák, webdeveloper, javascript developer"})
   })
   ;;
});
});

app.get('/underConstruction', function(req, res){

    if(isLoggedIn(req,res)){
      var logged = true;
    }else{
      var logged = false;
    }                                              
    
res.render('underConstruction',{logged: logged});
});

/*  app.get('/blog', function(req, res){
  
      if(isLoggedIn(req,res)){
        var logged = true;
      }else{
        var logged = false;
      }                                              

    
res.render('underConstruction',{logged: logged});
});
*/

app.get('/hiring', function(req, res){
    if(isLoggedIn(req,res)){
      var logged = true;
    }else{
      var logged = false;
    }
    
res.render('underConstruction',{logged: logged});
});

app.get('/technologies', function(req, res){
    
    if(isLoggedIn(req,res)){
      var logged = true;
    }else{
      var logged = false;
    }
    
res.render('underConstruction',{logged: logged});
});

app.get('/prices', function(req, res){
    if(isLoggedIn(req,res)){
      var logged = true;
    }else{
      var logged = false;
    }
    
  res.render('underConstruction',{logged: logged});
});

/*
app.get('/portfolio', function(req, res){
res.render('portfolio', {actualSite: "portfolio"});
});


app.get('/porftolio', function(req, res){
res.render('portfolio', {actualSite: "portfolio"});
});

app.get('/neco', function(req, res){
res.render('portfolio', {actualSite: "portfolio"});
});
*/

app.get('/samsungStv', function(req, res){
    if(isLoggedIn(req,res)){
      var logged = true;
    }else{
      var logged = false;
    }
    
  res.render('underConstruction',{logged: logged});
});

app.get('/html5', function(req, res){
    
    if(isLoggedIn(req,res)){
      var logged = true;
    }else{
      var logged = false;
    }
    
  res.render('underConstruction',{logged: logged});
});

app.get('/node', function(req, res){
    
    if(isLoggedIn(req,res)){
      var logged = true;
    }else{
      var logged = false;
    }
    
  res.render('underConstruction',{logged: logged});
});

app.get('/angular', function(req, res){
    
    if(isLoggedIn(req,res)){
      var logged = true;
    }else{
      var logged = false;
    }
    
    res.render('underConstruction',{logged: logged});
});

app.get('/cake', function(req, res){
    
    if(isLoggedIn(req,res)){
      var logged = true;
    }else{
      var logged = false;
    }
    
    res.render('underConstruction',{logged: logged});
});

  app.get('/cz', function(req, res){
    
    if(isLoggedIn(req,res)){
      var logged = true;
    }else{
      var logged = false;
    }
    
  aboutMe.findOne({lang:'cz'}, function(err, aboutMe){
   blogArticles.find({}).sort({created: -1}).limit(1).execFind(function(err,blogArticle){
    res.render('indexCzech', {czechHref:"/cz", englishHref:"/",actualSite: "index", aboutMe: aboutMe, logged: logged, blog:blogArticle[0], title:"Petr Borák, webdeveloper, javascript developer"})
   })
   ;;
});
});

         
}