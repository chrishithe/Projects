//import libraries
var express = require('express');
var router = express.Router();
var session = require('express-session');

router.use(session({secret:'ihateu'}));

//create variables 
// var conventionDb = require('../Models/conventionDb')
// var conventions = new conventionDb();
var dbConvention = require('../Models/dbConvention');
var c = new dbConvention();

//router gets data connections to pass the right data
router.get('/connections', function(req, res){
    if(req.session.userId){
    c.getConventions().exec((err,docs)=>{
        console.log(docs)
        res.render('connections', {session:req.session, conventions:docs});
    })
} else {
    res.redirect('/login?message1=Must%20Be%20Logged%20In%20To%20View');
}
    
});

module.exports = router;