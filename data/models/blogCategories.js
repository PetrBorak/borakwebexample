var mongoose = require('mongoose');
var blogCategories  = require('../schemas/blogCategories');
var blogCategories = mongoose.model('blogCategories', blogCategories);
module.exports = blogCategories;