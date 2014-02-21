var mongoose = require('mongoose');

var recipethumbs02 = new mongoose.Schema({
  img: String,
  url: String,
  number: Number,
  type: String,
  urlToSite: String,
  headline: String,
  description: String,
  largeImg: String,
  day: String,
  nth: String,
  month: String,
  year: String,
}, {collection: "recipethums02"});
recipethumbs02.statics.search = function(str,callback){
var regexp = new RegExp(str,"i");
return this.find({'$or':[{headline: regexp},{description:regexp}]},callback)
}
module.exports = recipethumbs02;