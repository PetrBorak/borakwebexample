var mongoose = require('mongoose');

var contactMeSchema = new mongoose.Schema({
  content: String,
  name: String,
  contact: String
});
module.exports = contactMeSchema;