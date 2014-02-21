var mongoose = require('mongoose');

var blogCategories = new mongoose.Schema({
  type: String,
},{collection: "blogCategories"});


module.exports = blogCategories;