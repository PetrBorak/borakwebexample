var mongoose = require('mongoose');
var activities  = require('../schemas/activities');
var activities = mongoose.model('activities', activities);
module.exports = activities;