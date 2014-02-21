/*
 * GET home page.
 */
var contactMe = require('../data/models/contactMe');

module.exports = function(app){

app.post('/contactForm', function(req, res){
var contactMex = req.body;
contactMe.create(contactMex, function(err){
res.redirect('/');
})

});

app.get('/contactForm', function(req, res){
contactMe.find({},function(err,about){
res.render('contactForm', {about: about});
})
});

}                   