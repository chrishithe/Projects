var express = require('express');
var router = express.Router();
var session = require('express-session');

router.use(session({secret:'ihateu'}));

router.get('/contact', function(req, res){
    res.render('contact', {session:req.session});
});

module.exports = router;