var etops = require('../data/models/etops');
var async = require('async');



module.exports = function(app){

app.options('/etops', function(req, res){
      console.log('!OPTIONS');
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
      res.end("hello world \n");
});

app.get('/etops', function(req, res){
     etops.find({},function(err,pizzas){
     
     if(err){
       
       console.log("error occured");
       console.log(err);
       
       var headers = {};
       headers["Access-Control-Allow-Origin"] = "*";
       headers["Content-type"] = "application/JSON";
       res.writeHead(200, headers);
       res.end(JSON.stringify(err));
     
     }
     else{
       console.log("item fetched");
       var headers = {};
       headers["Access-Control-Allow-Origin"] = "*";
       headers["Content-type"] = "application/JSON";
       res.writeHead(200, headers);
       res.end(JSON.stringify(pizzas));
     }
    });
});

app.get('/etopsFaked', function(req, res){
       console.log("etops faked");
       var headers = {};
       headers["Access-Control-Allow-Origin"] = "*";
       headers["Content-type"] = "application/JSON";
       res.writeHead(200, headers);
       res.end(JSON.stringify({x:4}));
});

app.options('/etopsFaked', function(req, res){
      console.log('!OPTIONS');
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
      res.end("hello world \n");
});

}
