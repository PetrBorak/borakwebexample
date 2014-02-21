var mongoose = require('mongoose');

var portfolioDetail = new mongoose.Schema({
  url: String,
  headline: String,
  description: String,
  datum: String,
  img: String,
  number: Number
}, {collection: "portfolioDetail"});
module.exports = portfolioDetail;