var mongoose = require('mongoose');

var AboutMeSchema = new mongoose.Schema({
  id: 0,
  headline: String,
  content: String,
  lang: String,
});
AboutMeSchema.statics.search = function(string,callback){
var regexp = new RegExp(string, "i");
return this.find({$or:[{headline:regexp},{content:regexp}]},callback)
}
module.exports = AboutMeSchema;