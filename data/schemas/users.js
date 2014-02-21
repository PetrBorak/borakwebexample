var mongoose = require('mongoose');

var users = new mongoose.Schema({
  name: String,
  password: String
}, {collection: "users"});
module.exports = users;