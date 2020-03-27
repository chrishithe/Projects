//import libraries
var express = require('express');
var router = express.Router();
var session = require('express-session');

router.use(session({secret:'ihateu'}));

//create variables
var dbConvention = require('../Models/dbConvention')
var conventions = new dbConvention();

//router gets data connection to pass the right data 
router.get('/connection', function(req, res){
    var qs = req.query; 
   
    
    conventions.getConventionById(qs.id).exec((err,docs)=>{
        console.log(docs)
        if(docs){
            res.render('connection', {session:req.session, qs:req.query, conventions:docs});
        }
        else{
            res.redirect('/connections');
        }
       
    })
    
    
});

//whenever theres an issue, console.log it 
module.exports = router;