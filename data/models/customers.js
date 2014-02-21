var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  date: Date,
  noc: 0,
  phoneNumber: 0,
  email: String,
  
});

module.exports = customerSchema;