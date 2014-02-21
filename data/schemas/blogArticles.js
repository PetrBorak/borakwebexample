var mongoose = require('mongoose');

var blogArticles = new mongoose.Schema({
  type: String,
  header: String,
  perex: String,
  main: String,
  lang: String,
  created: {type: Date, default: Date.now}
},{collection: "blogArticles"});


module.exports = blogArticles;