var mongoose = require('mongoose');
var users  = require('../schemas/users');
var users = mongoose.model('users', users);
module.exports = users;