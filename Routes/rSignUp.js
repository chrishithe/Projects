//import libraries
var express = require('express');
var router = express.Router();
var userDB = require('../models/userDb');
var session = require('express-session');
var bodyParser = require('body-parser');
var conventionDb = require('../models/conventionDb'); // required it & then have to invoked
var user = require('../models/User');
var { check, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');

//create variables
var con = new conventionDb(); //invoked 
var user = new userDB();

router.use(session({ secret: 'ihateu' }));
router.use(bodyParser.json()); //change json
router.use(bodyParser.urlencoded({ extended: true }));



router.post('/signUp', [
    check('firstName').isString().trim().escape(),
    check('lastName').isString().trim().escape(),
    check('email').isEmail().normalizeEmail().trim().escape(),
    check('password').isLength({ min: 3 })
],
    function (req, res) {
        const errors = validationResult(req);
        var emailCorrect = false;
        var passwordCorrect = false;
        var pass = '';
        
            if (!errors.isEmpty()) {
                console.log(errors)
            } else {
                passwordCorrect = true;
            }
    console.log(req.body.firstName)
    console.log(req.body.lastName)
    console.log(req.body.email)
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, 8, function (err, hash) {
            user.addUsers(req.body.firstName, req.body.lastName, req.body.email, hash);
            });
        });

    res.redirect('/login');
})
router.get('/signUp', function(req, res){
    res.render('signUp', {session:req.session})
});

module.exports = router;