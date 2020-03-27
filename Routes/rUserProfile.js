//import libraries
var express = require('express');
var router = express.Router();
var userDB = require('../models/userDb');
var userProfile = require('../models/userProfile');
var session = require('express-session');
var bodyParser = require('body-parser');
var connection = require('../models/connection');
var userConnection = require('../models/userConnection');
var conventionDb = require('../models/conventionDb'); // required it & then have to invoked
var{ check, validationResult } = require('express-validator');
var user = require('../models/User');

//create variables
var userPro = new userProfile();
var con = new conventionDb(); //invoked 
var conventions = con.getConventions();

router.use(session({secret:'ihateu'}));
router.use(bodyParser.json()); //change json
router.use(bodyParser.urlencoded({extended:true}));

//router gets data userProfile to pass the right data
router.post('/connect', [
    check('email').isEmail().normalizeEmail().trim().escape(),
    check('password').isString().trim().escape(),
    check('password').isLength({min:3})
],function(req, res){
     const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log('Error!');
        console.log(errors)
        res.redirect('/userProfile')
    }
    var connect1 = new connection(req.session.userId, req.body.conventionId, req.body.host, req.body.convention, req.body.location, req.body.time); 
    userPro.addConnection(req.session.userId, connect1, 'Yes', res);     
});
router.post('/Maybe', [
    check('Maybe').isString().trim().escape()
],function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors)
        res.redirect('/userProfile');
    }
    userPro.setRSVP(req.body.Maybe, 'Maybe');
    res.redirect('/userProfile');
    
}); //using RSVP
router.post('/Yes', [
    check('Yes').isString().trim().escape()
],function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors)
        res.redirect('/userProfile');
    }
    userPro.setRSVP(req.body.Yes, 'Yes');
    res.redirect('/userProfile');
    
});
router.post('/No', [
    check('No').isString().trim().escape()
],function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors)
        res.redirect('/userProfile');
    }
    userPro.setRSVP(req.body.No, 'No'); //using RSVP
    res.redirect('/userProfile');
     //resetting connections; //resetting connections
});
router.post('/Delete', [
    check('Delete').isString().trim().escape()
],function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors)
        res.redirect('/userProfile');
    }
    userPro.removeConnection(req.body.Delete); //this route gives you the value of the hidden field (userId)
    res.redirect('/userProfile');
})

//get the connections to the user, loops through the user, pushes new connections to local array (connect), then assigns that array to session
router.get('/userProfile', function(req,res){
    
   

 
    var connect = [];
    userPro.getConnections(req.session.userId).exec((err, docs)=>{
       
        for(x in docs){
            connect.push(new userConnection(new connection(docs[x]._id, docs[x].conventionId, docs[x].host, docs[x].name, docs[x].location,  docs[x].time), docs[x].rsvp)); //creating new objects for each document
        }
        req.session.connections = connect;
        console.log(connect)
        res.render('userProfile',{session:req.session,conventions:conventions});
    });
});

router.get('/updateRSVP', function(req, res){
    res.render('updateRSVP', {session:req.session, qs:req.query});
});




module.exports = router; 