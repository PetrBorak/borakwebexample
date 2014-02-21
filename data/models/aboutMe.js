var mongoose = require('mongoose');
var AboutMeSchema  = require('../schemas/aboutMe');

AboutMeSchema.static.search = function(string,callback){
var regexp = new RegExp(string);
return this.find({$or:[{headline:regexp},{content:regexp}]},callback)
}

var AboutMe = mongoose.model('AboutMe', AboutMeSchema);
module.exports = AboutMe;