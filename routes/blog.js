/*
 * GET home page.
 */
var aboutMe = require('../data/models/aboutMe');
var blogCategories = require('../data/models/blogCategories');
var blogArticles = require('../data/models/blogArticles');

module.exports = function(app){
app.get('/blog', function(req, res){
aboutMe.findOne({}, function(err, aboutMe){
res.render('blog', {czechHref:'/blog', englishHref:'/#',title:"Petr Borák's blog", actualSite: "blog"});
});
});

app.get('/blog/cz', function(req, res){
aboutMe.findOne({}, function(err, aboutMe){
res.render('blogCzech', {czechHref:'/#', englishHref:'/blog', title:"Petr Borák, blog", actualSite: "blog"});
});
});



app.get('/blog/blogadmin', function(req, res){
res.render('blogadmin');
});

app.get('/blog/blogadmin/articlestoshow', function(req, res){
res.render('blogadmin');
});

app.post('/blog/blogadmin', function(req, res){
     var blogArt = new blogArticles({
     type: req.body.BACategory,
     main: req.body.BAMain,
     perex: req.body.BAPerex,
     header: req.body.BAHeader,
     lang: req.body.BALanguage,
     });
     
     blogArt.save(function(err){
      res.redirect("/blog/blogadmin/");
     })
});

app.get('/blog/blogadmin/articles', function(req, res){
     
     
     blogArticles.find({lang:'en'}).sort({created: 1}).execFind(function(err, articles){
     
     
      for(var i= 0; i<articles.length;i++){
       articles[i].perex = articles[i].perex.substring(0,370);
      }
     
      res.writeHead(200,{'content-type':'text/json'});
      res.write(JSON.stringify(articles));
      res.end('\n');
     });
     
     });
     
app.get('/blog/blogadmin/articles/cz', function(req, res){
     
     
     blogArticles.find({lang:'cz'}).sort({created: 1}).execFind(function(err, articles){
     
     
      for(var i= 0; i<articles.length;i++){
       articles[i].perex = articles[i].perex.substring(0,370);
      }
     
      res.writeHead(200,{'content-type':'text/json'});
      res.write(JSON.stringify(articles));
      res.end('\n');
     });
     
     });

app.del('/blog/blogadmin/articles/:id', function(req, res){
     blogArticles.findOne({_id:req.params.id},function(err,articles){
        articles.remove();
        res.writeHead(200,{'content-type':'text'});
     res.write("succes");
     res.end('\n');
     })
});

app.get('/blog/blogadmin/articles/:id', function(req, res){
      blogArticles.findOne({_id:req.params.id},function(err,article){
     res.writeHead(200,{'content-type':'text/json'});
     res.write(JSON.stringify(article));
     res.end('\n');
     });
});

app.get('/blog/blogadmin/article/:id', function(req, res){
  res.render('blogadmin');
});
app.get('/blogarticle/articles/:id/cz', function(req, res){
  blogArticles.findOne({_id:req.params.id},function(err,blogArticle){
    blogArticles.find({$and:[{lang:blogArticle.lang}, {type:blogArticle.type},{_id:{$ne:blogArticle._id}}]}, function(err,related){
    
     
  var namesOfMonths = [
    "Leden",
    "Únor",
    "Březen",
    "Duben",
    "Květen",
    "Červen",
    "Červenec",
    "Srpen",
    "Září",
    "Říjen",
    "Listopad",
    "Prosinec"
    ]
    
    var posted =  new Date(blogArticle.created)
         blogArticle.dateCreated = posted.getDate();
     var month = blogArticle.monthCreated = parseFloat(posted.getMonth());
     blogArticle.hoursCreated = posted.getHours();
     blogArticle.minutesCreated = posted.getMinutes();
      blogArticle.yearCreated = posted.getFullYear();
      blogArticle.nameOfMonth = namesOfMonths[month];
     if(parseFloat(blogArticle.dateCreated)==1){
      blogArticle.nth = "st";
     }else if(parseFloat(blogArticle.dateCreated)==2){
      blogArticle.nth = "nd";
     }else if(parseFloat(blogArticle.dateCreated)==3){
      blogArticle.nth = "rd";
     }else if(parseFloat(blogArticle.dateCreated)>3){
        blogArticle.nth = "th";
     }
     
  res.render('blogOneCzech',{czechHref:'/#', englishHref:'/blog',related: related, blogArticle: blogArticle, ogurl: "http://www.borakpetr.cz/blog/"+blogArticle._id+'/cz', title: blogArticle.header,actualSite: "blog"});
    
    });
  });
  
});
app.get('/blogarticle/articles/:id', function(req, res){
  blogArticles.findOne({_id:req.params.id},function(err,blogArticle){
    blogArticles.find({$and:[{lang:'en'}, {type:blogArticle.type},{_id:{$ne:blogArticle._id}}]}, function(err,related){
    
     
  var namesOfMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
    ]
    
    var posted =  new Date(blogArticle.created)
         blogArticle.dateCreated = posted.getDate();
     var month = blogArticle.monthCreated = parseFloat(posted.getMonth());
     blogArticle.hoursCreated = posted.getHours();
     blogArticle.minutesCreated = posted.getMinutes();
      blogArticle.yearCreated = posted.getFullYear();
      blogArticle.nameOfMonth = namesOfMonths[month];
     if(parseFloat(blogArticle.dateCreated)==1){
      blogArticle.nth = "st";
     }else if(parseFloat(blogArticle.dateCreated)==2){
      blogArticle.nth = "nd";
     }else if(parseFloat(blogArticle.dateCreated)==3){
      blogArticle.nth = "rd";
     }else if(parseFloat(blogArticle.dateCreated)>3){
        blogArticle.nth = "th";
     }
     
  res.render('blogOne',{czechHref:'/blog/cz', englishHref:'#',related: related, blogArticle: blogArticle, ogurl: "http://www.borakpetr.cz/blog/"+blogArticle._id, title: blogArticle.header,actualSite: "blog"});
    
    });
  });
  
});
                                                         
app.get('/blog/categories', function(req, res){
   blogCategories.find({},function(err,bc){
      res.writeHead(200, {'content-type': 'text/json' });
      res.write(JSON.stringify(bc) );
      res.end('\n');
   })
});

app.get('/blog/testing', function(req, res){
   
      res.render("testing")
   
});

app.post('/blog/blogadmin/savearticle/:id', function(req, res){
   blogArticles.findOne({_id: req.params.id},function(err,bc){
      bc.header = req.body.BAHeader;
      bc.main =  req.body.BAMain;
      bc.perex =  req.body.BAPerex;
      bc.type =  req.body.BACategory;
      bc.lang =  req.body.BALanguage;
      bc.save(function(err){
        res.redirect("/blog/blogadmin/articlestoshow/"+req.params.id);
      })
   })
});


app.get('/blog/blogadmin/articlestoshow/:id', function(req, res){
   res.render('blogadmin');
});




}                   