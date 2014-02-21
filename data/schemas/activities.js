var mongoose = require('mongoose');

var activities = new mongoose.Schema({
  type: String,
  header: String,
  perex: String,
  main: String,
  lang: String,
},{collection: "activities"});

activities.statics.search = function(str,callback){
var regexp = new RegExp(str,"i");
return this.find({'$or':[{header: regexp},{perex: regexp},{main:regexp}]},callback)
}

module.exports = activities;