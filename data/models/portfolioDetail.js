var mongoose = require('mongoose');
var pt  = require('../schemas/portfolioDetail');
var pt = mongoose.model('pt', pt);
module.exports = pt;