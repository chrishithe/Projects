var express = require('express');
var router = express.Router();
var session = require('express-session');

router.use(session({secret:'ihateu'}));

router.get('/', function(req, res){
    if(req.session){
        
    }
    else{
        
    }
    res.render('index',{session:req.session});
});

module.exports = router;