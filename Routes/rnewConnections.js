//import libraries
var bodyParser = require('body-parser');
var dbConvention = require('../Models/dbConvention');
var express = require('express');
var router = express.Router();
var session = require('express-session');
var{check, validationResult } = require('express-validator');

router.use(session({secret:'ihateu'}));
router.use(bodyParser.json()); //change json
router.use(bodyParser.urlencoded({extended:true}));

var c = new dbConvention();

router.get('/newConnection', function(req, res){
    if(req.session.userId){
    res.render('newConnection', {session:req.session});
    } else {
        res.redirect('/login?message1=Must%20Be%20Logged%20In%20To%20View');
    }
});
router.post('/newConnection', [
    check('host').isString().trim().escape(),
    check('name').isString().trim().escape(),
    check('location').isString().trim().escape(),
    check('time').isString().trim().escape(),
    check('price').isString().trim().escape(),
    check('date').trim().escape()
],function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log('Error!');
        res.redirect('/userProfile')
    }
    console.log(req.body.host);
    c.addConvention(req.session.userId, req.body.host, req.body.name, req.body.location, req.body.time, req.body.price);
    res.redirect('/connections');
});

module.exports = router;