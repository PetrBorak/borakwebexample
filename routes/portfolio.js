var aboutMe = require('../data/models/aboutMe');
var fs = require('fs');
var recipethums02 = require('../data/models/recipethumbs02');
var notLI = require('./middleware/notLoggedIn');
var isLI = require('./middleware/isLoggedIn');
//var pt = require('../data/models/portfolioDetail');



module.exports = function(app){


app.get('/portfolio/:type/new', notLI, function(req, res){
 res.render('adminportfolioNew', {current: req.params.type, logged: true});
});

app.get('/portfolio/:type',function(req, res){

recipethums02.findOne({"type":req.params.type}, function(err, recipethumbs){
if(recipethumbs == null){
res.redirect("/underConstruction");
}else{

var url = recipethumbs._id;
url = "/portfolio/" + req.params.type+"/" + url;
res.redirect(url);
}

});
});

app.get('/portfolio/:type/cz',function(req, res){

recipethums02.findOne({"type":req.params.type}, function(err, recipethumbs){
if(recipethumbs == null){
res.redirect("/underConstruction");
}else{

var url = recipethumbs._id;
url = "/portfolio/" + req.params.type+"/" + url+"/cz";
res.redirect(url);
}

});
});

app.delete('/adminportfolio/:type/:id', notLI, function(req, res){
  recipethums02.findOne({"_id":req.params.id}, function(err,doc){
    doc.remove(function(err){
      res.redirect("/adminportfolio/"+req.params.type);
    });
  })});
  
app.post('/adminportfolio/:type', function(req, res){
         var doc = new recipethums02({type: req.params.type, headline: req.body.headline, urlToSite: req.body.urlToSite, description: req.body.description, day: req.body.day, nth: req.body.nth, month: req.body.month, year: req.body.year});
  doc.save(function(err){
  fs.readFile(req.files.img.path, function (err, data) {
    
    var newPath = "/root/public/uploads/"+ req.files.img.name;
      fs.writeFile(newPath, data, function (err) { 
      
        fs.readFile(req.files.largeImg.path, function (err, data) {
        
        var newPath = "/root/public/uploads/"+ req.files.largeImg.name;
        fs.writeFile(newPath, data, function (err) { 
          console.log(__dirname);
          doc.img = "/uploads/" + req.files.img.name;
          doc.largeImg = "/uploads/" + req.files.largeImg.name;
          doc.save(function(err){
            res.redirect("/adminportfolio/"+req.params.type);
          });
    
        });
      });
    });
  });


  });
  
  });
  
app.put('/adminportfolio/:type/:id', function(req, res){
  recipethums02.findOne({"_id":req.params.id}, function(err,doc){

  doc.headline = req.body.headline;
  doc.urlToSite = req.body.urlToSite;
  doc.description = req.body.description;
  doc.day = req.body.day;
  doc.nth = req.body.nth;
  doc.month = req.body.month;
  doc.year = req.body.year;
  console.log(req.files);  
  doc.save(function(err){
  if(err){
    res.redirect("/");
  }else{
  if(req.files.largeImg.name != ""){
    fs.readFile(req.files.largeImg.path, function (err, data) {
  
      var newPath = "/root/public/uploads/"+ req.files.largeImg.name;
      fs.writeFile(newPath, data, function (err) { 
       
        fs.readFile(req.files.img.path, function (err, data) {
        var newPath = "/root/public/uploads/"+ req.files.img.name;
        fs.writeFile(newPath, data, function (err) { 
          console.log(__dirname);
          doc.largeImg = "/uploads/" + req.files.largeImg.name;
          doc.img = "/uploads/" + req.files.img.name;
      
          doc.save(function(err){
            res.redirect("/adminportfolio/"+req.params.type);
          });
        });
      });
    
    });
  });
  }else{
    res.redirect("/adminportfolio/"+req.params.type);
  }

    
  }
  
  });
  
  });
});
app.get('/adminportfolio/:type/:id', notLI, function(req, res){
  recipethums02.find({$and:[{"_id":req.params.id},{"type":req.params.type}]},function(err, recipethumbs){
        res.render('adminportfolioConcrete', {item: recipethumbs, logged: true});
  });
});

app.get('/adminportfolio/:type', notLI, function(req, res){
recipethums02.find({"type":req.params.type},function(err, recipethumbs){
res.render("adminMain", {items: recipethumbs, active: req.params.type, logged: true});
} 
)
});

app.get('/portfolio/:type/:id', function(req, res){

    if(isLI(req,res)){
      var logged = true;
    }else{
      var logged = false;
    }
    

recipethums02.find({"type":req.params.type}, function(err, recipethumbs){
  recipethums02.find({$and:[{"_id":req.params.id},{"type":req.params.type}]}, function(err,detailpt){
  recipethums02.findOne({$and:[{"_id":{$gt:detailpt[0]._id}},{"type":req.params.type}]},function(err,next){
      var prev = recipethums02.find({$and:[{"_id":{$lt:detailpt[0]._id}},{"type":req.params.type}]}).sort({"_id": -1}).limit(1);
    prev.execFind(function(err,prev){
        res.render('portfolio02', {englishHref:"/portfolio/"+detailpt[0].type+"/"+detailpt[0]._id,czechHref:"/portfolio/"+detailpt[0].type+"/"+detailpt[0]._id+"/cz", actualSite: "portfolio",recipethumbs: recipethumbs,  active: req.params.type, detailpt: detailpt, nextitem: next, previtem: prev, logged: logged});  
});
});
});
});
});

app.get('/portfolio/:type/:id/cz', function(req, res){

    if(isLI(req,res)){                  
      var logged = true;
    }else{
      var logged = false;
    }
    

recipethums02.find({"type":req.params.type}, function(err, recipethumbs){
  recipethums02.find({$and:[{"_id":req.params.id},{"type":req.params.type}]}, function(err,detailpt){
  recipethums02.findOne({$and:[{"_id":{$gt:detailpt[0]._id}},{"type":req.params.type}]},function(err,next){
      var prev = recipethums02.find({$and:[{"_id":{$lt:detailpt[0]._id}},{"type":req.params.type}]}).sort({"_id": -1}).limit(1);
    prev.execFind(function(err,prev){
        res.render('portfolio02Czech', {englishHref:"/portfolio/"+detailpt[0].type+"/"+detailpt[0]._id,czechHref:"/portfolio/"+detailpt[0].type+"/"+detailpt[0]._id+"/cz",actualSite: "portfolio",recipethumbs: recipethumbs,  active: req.params.type, detailpt: detailpt, nextitem: next, previtem: prev, logged: logged});  
});
});
});
});
});
}