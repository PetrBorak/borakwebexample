var mongoose = require('mongoose');
var etops = require('../schemas/etops');

var etops = mongoose.model('etops',etops);
module.exports = etops;