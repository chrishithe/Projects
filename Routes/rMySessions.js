//import libraries
var dbConvention = require('../Models/dbConvention'); // required it & then have to invoked
var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');


var myConnects = new dbConvention(); //invoked 

router.use(session({ secret: 'ihateu' }));
router.use(bodyParser.json()); //change json
router.use(bodyParser.urlencoded({ extended: true }));


//router for posting userProfile
router.get('/mySessions', function (req, res) {
    if(req.session.userId){
        myConnects.getConventionsById(req.session.userId).exec((err, docs)=>{
            console.log(docs);
            res.render('mySessions', {session: req.session, docs:docs});
       }) 
    } else {
        res.redirect('/login?message1=Must%20Be%20Logged%20In%20To%20View');
    }
    
 }); 

 router.post('/deleteSession', function(req, res){
     myConnects.removeConventionById(req.body.Delete);
    res.redirect('/mySessions');
 })
module.exports = router;