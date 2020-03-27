var express = require('express');
var router = express.Router();
var session = require('express-session');

router.use(session({secret:'ihateu'}));

router.get('/about', function(req, res){
    res.render('about', {session:req.session});
});

module.exports = router;