var aboutMe = require('../data/models/aboutMe');
var fs = require('fs');
var recipethums02 = require('../data/models/recipethumbs02');
var activities = require('../data/models/activities');
var notLI = require('./middleware/notLoggedIn');
var isLI = require('./middleware/isLoggedIn');
//var pt = require('../data/models/portfolioDetail');



module.exports = function(app){


app.get('/adminactivities', notLI, function(req, res){
  activities.find({},function(err,activities){
  res.render('activities/adminactivities', {logged: true, activities: activities});
  });
 
});
app.delete('/adminactivities/:type/:id', notLI, function(req, res){
  activities.findOne({_id:req.params.id},function(err,activity){
   activity.remove(function(err){
    res.redirect("/adminactivities");
   })
  
  });
 
});
app.get('/adminactivities/:type', notLI, function(req, res){
  activities.find({$and:[{type: req.params.type},{lang:'en'}]},function(err,activitiesx){
  activities.find({$and:[{type: req.params.type},{lang:'cz'}]},function(err,activitiesCZ){
  res.render('activities/adminactivitiesConcrete', {type: req.params.type, logged: true, activities: activitiesx, activitiesCzech:activitiesCZ});
  });
  
  });
 
});

app.get('/adminactivities/:type/:id', notLI, function(req, res){
  activities.find({$and:[{type: req.params.type},{_id: req.params.id}]},function(err,activity){
  res.render('activities/adminactivitiesConcreteItem', {typex: req.params.type, logged: true, activity: activity[0]});
  });
 
});

app.get('/adminactivities/:type/:id', notLI, function(req, res){
  activities.find({$and:[{type: req.params.type},{_id: req.params.id}]},function(err,activity){
  res.render('activities/adminactivitiesConcreteItem', {typex: req.params.type, logged: true, activity: activity[0]});
  });
 
});

app.put('/adminactivities/:type/:id',function(req, res){
  activities.find({$and:[{type: req.params.type},{_id: req.params.id}]},function(err,activity){
    activity[0].header = req.body.header;
    activity[0].perex = req.body.perex;
    activity[0].main = req.body.main;
    activity[0].lang = req.body.lang;
    activity[0].save(function(err){
      res.render('activities/adminactivitiesConcreteItem', {typex: req.params.type, logged: true, activity: activity[0]});    
    });

  });
 
});

app.get('/adminactivitiesnew/:type', notLI, function(req, res){
  res.render("activities/adminactivitiesNew",{type: req.params.type}); 
});

app.post('/adminactivities/:type', notLI, function(req, res){
  var activity = new activities();
  activity.type = req.params.type;
  activity.header = req.body.header;
  activity.perex = req.body.perex;
  activity.main = req.body.main;
  activity.lang = req.body.lang;
  activity.save(function(err){
    res.redirect("adminactivities/"+req.params.type+"/"+activity._id); 
  });
  
});

app.get('/activities/:type', function(req, res){
  activities.find({$and:[{type: req.params.type},{lang: 'en'}]}, function(err,activities){
    var title = (function(activities){
      switch(req.params.type){
      case 'web':
      return 'Petr Borák: webdevelopement, webdesign and javascript';
      break;
      case 'dtp':
      return 'Petr Borák: dtp operator and webdesigner'
      break;
      case 'graphics':
      return 'Petr Borák: webdesigner and illustrator';
      break;
      }
    }());
    
    res.render("activities/activities",{title: title, activities: activities, type: req.params.type});   
  })
  
});

app.get('/aktivity/:type', function(req, res){
  var typepar = (function(x){
     switch(x){
     case 'grafika':
     return 'graphics';
     break;
     default:
     return x;
     break;
     }
  }(req.params.type))
  activities.find({$and:[{type: typepar},{lang:'cz'}]}, function(err,activities){
    var title = (function(activities){
      switch(req.params.type){
      case 'web':
      return 'Petr Borák: webdevelopement, webdesign a javascript';
      break;
      case 'dtp':
      return 'Petr Borák: dtp operator a webdesigner'
      break;
      case 'grafika':
      return 'Petr Borák: webdesigner a ilustrátor';
      break;
      }
    }());
    
    res.render("activities/activitiesCzech",{title: title, activities: activities, type: req.params.type});   
  })
  
});

app.get('/activities/:type/:id', function(req, res){
  activities.find({$and:[{type: req.params.type},{_id: req.params.id}]}, function(err,activities){
    res.render("activities/concrete",{activities: activities[0], type: req.params.type});   
  })
  
});

}            