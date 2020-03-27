var User = require('./User');

//database for users
//requiring mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Ckventions', {useNewUrlParser: true}); //'/Ckventions' creates the database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
//we're connected
});
//mongoose data
var userInfoDB = new mongoose.Schema({
    userId: {type: String, required:true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
}, {collection: 'userDB'});


    class userDB {

        constructor() {
            
        }
    
        getUsers() {
        var userInfo = mongoose.model('userDB', userInfoDB);
            return userInfo.find();
        }
        addUsers(firstName, lastName, email, password) {
            var userInfo = mongoose.model('userDB', userInfoDB);
            var user = new userInfo({userId: '1', firstName:firstName, lastName:lastName, email:email, password:password});
            user.save();
        }
    }
    
    module.exports = userDB;