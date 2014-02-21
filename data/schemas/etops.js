var mongoose = require('mongoose');

var etopsSchema = new mongoose.Schema({
 name: String,
 ingredients: Array,
 price: Number,
 image: String,
 discount: Number
},{
 collection: "etops"
});

module.exports = etopsSchema;