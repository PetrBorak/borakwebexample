/*
 * GET home page.
 */
var aboutMe = require('../data/models/aboutMe');
var recipes = require('../data/models/recipethumbs02');
var activities = require('../data/models/activities');

module.exports = function(app){
app.get('/search', function(req, res){
aboutMe.search(req.query.search,function(err, results){
for(var i =0;i<results.length;i++){
results[i].content = results[i].content.substring(0,230);
results[i].content += " ...";
  
  
}

  recipes.search(req.query.search,function(err, results00){
    
    for(var i =0;i<results00.length;i++){
      results00[i].description = results00[i].description.substring(0,230);
      results00[i].description += " ...";
      }
      
      activities.search(req.query.search,function(err, results01){
        for(var i =0;i<results01.length;i++){
          results01[i].perex = results01[i].perex.substring(0,230);
          results01[i].perex += " ...";
        }
        res.render('search',{results: results, results00: results00, results01: results01});
    });
  });
 });
})
}            