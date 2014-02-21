var mongoose = require('mongoose');
var contactMeSchema  = require('../schemas/contactMe');
var contactMeModel = mongoose.model('ContactMeModel', contactMeSchema);
module.exports = contactMeModel;