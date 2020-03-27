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
var user = require('../models/User');
var { check, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');

//create variables
var userPro = new userProfile();
var con = new conventionDb(); //invoked 
var conventions = con.getConventions();

router.use(session({ secret: 'ihateu' }));
router.use(bodyParser.json()); //change json
router.use(bodyParser.urlencoded({ extended: true }));

bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash('ugly', 8, function (err, hash) {
        console.log(hash)
        bcrypt.compare('br', hash, function (err, res) {
            console.log(res)
        });
    });
});

//router for posting userProfile
router.post('/login', [
    check('email').isEmail().normalizeEmail().trim().escape(),
    check('password').isString().trim().escape(),
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
        var u = '';
        var userD = new userDB();
        userD.getUsers().exec((err, docs) => { //doc is the results
            var users = [];
            var u = '';

            for (x in docs) {
                users.push(new user(docs[x]._id, docs[x].firstName, docs[x].lastName, docs[x].email, docs[x].password));
            }
            for (x in users) {
                if (users[x].email === req.body.email) {
                    u = users[x];
                    emailCorrect = true;
                    password = users[x].password;
                    console.log('success');
                } else {

                }
            }
            if (!emailCorrect) {
                res.redirect('/login?message=Email%20or%20Password%20Not%20Found');
            }
            else if (emailCorrect) {
                console.log(req.body.password)
                console.log(password)
                bcrypt.compare(req.body.password, password, function (err, s) {
                    if (s) {
                        req.session.userId = u.userId;
                        req.session.name = u.firstName + " " + u.lastName;
                        req.session.email = u.email;
                        req.session.user = userPro;
                        req.session.connections = [];
                        userPro.getConnections(u.userId).exec((err, docs) => {
                            for (x in docs) {
                                req.session.connections.push(new userConnection(new connection(docs[x]._id, docs[x].conventionId, docs[x].host, docs[x].name, docs[x].location, docs[x].time), "Yes")); //creating new objects for each document                        
                            }
                        })
                        res.redirect('/userProfile');
                    }
                    else {
                        res.redirect('/login?message=Email%20or%20Password%20Not%20Found');
                    }
                });
            }
        });
    });

router.get('/login', function (req, res) {
    res.render('login', { session: req.session, qs: req.query });
});
router.get('/logOut', function (req, res) {
    userPro.emptyProfile();
    req.session.destroy(function (err) {
        if (err) {
            res.negotiate(err);
        }
        res.redirect('/');
    });
});

module.exports = router;