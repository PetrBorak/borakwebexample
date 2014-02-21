/*
 * GET home page.
 */
var aboutMe = require('../data/models/aboutMe');

module.exports = function(app){
app.get('/aboutMe/:lang', function(req, res){
//aboutMe = new aboutMe();
//aboutMe.content = "sample content";
//aboutMe.headline = "sample Headline";
//aboutMe.save(function(){

aboutMe.find({lang:req.params.lang}, function(err, aboutMe){
res.render('aboutMe', {aboutMe: aboutMe[0]});
});
//});


});

app.post('/aboutMe', function(req, res){
aboutMe.findOne({lang:req.body.lang}, function(err, am){
    if(am == null){
    console.log(req.body.lang);
    aboutMe.create({
      headline: req.body.headline,
      content: req.body.content,
      lang: req.body.lang
    }, function(err){
        res.redirect("/aboutMe/"+req.body.lang);
    });
    }else{
      am.headline = req.body.headline;
      am.content = req.body.content;
      am.save(function(err){
        res.redirect("/aboutMe/"+req.body.lang);
      });    
    }

  });

});

}                   