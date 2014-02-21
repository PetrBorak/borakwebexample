var mongoose = require('mongoose');
var blogArticles  = require('../schemas/blogArticles');
var blogArticles = mongoose.model('blogArticles', blogArticles);
module.exports = blogArticles;