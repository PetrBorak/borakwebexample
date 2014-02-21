var mongoose = require('mongoose');
var recipethumbs  = require('../schemas/recipethumbs02');
var recipethumbs02 = mongoose.model('recipethumbs02', recipethumbs);
module.exports = recipethumbs02;