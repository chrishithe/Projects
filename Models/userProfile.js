// var conventionDb = require('./conventionDb');
// var connection = require('./connection');
// var con = new conventionDb();

var userConnection = require('./userConnection');

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
var connectionsDB = new mongoose.Schema({
    userId: {type: String, required:true},
    conventionId: {type: String, required: true},
    host: {type: String, required: true},
    name: {type: String, required: true},
    location: {type: String, required: true},
    time: {type: String, required: true},
    rsvp: {type: String, required: true}
}, {collection: 'connectionsDB'});

//Database for convention(connection) Information
var connections = mongoose.model('connectionsDB', connectionsDB);

class userProfile {

    constructor() {
        this.connections = [];
    }
    getConnections(userId) {
       
        return connections.find({userId:userId});
    }

    getConnections_1(userId) {
        
        connections.find({userId:userId}).exec((err,docs)=>{
            console.log('yo')
            console.log(docs)
        });
    }
    addConnection(userId, connection, rsvp, res) {
        var connections = mongoose.model('connectionDB', connectionsDB);
        var cons = new connections({userId:userId, conventionId:connection.conventionId, host:connection.host, name:connection.name, location:connection.location, time:connection.time, rsvp:rsvp});
        cons.save();
        res.redirect('/userProfile');
    }
    //remove connection, given the host of the convention
    removeConnection(userId) {
        var connections = mongoose.model('connectionDB', connectionsDB);
        connections.deleteOne({_id:userId}).exec((err, docs)=>{
            
        });
    }
    //set rsvp by calling rsvp from userConnection class
    setRSVP(id, rsvp){
        
       connections.findOne({_id:id}).updateOne({$set:{rsvp: rsvp}}).exec((err,docs)=>{
        
    });

    }
    //clear all user connections
    emptyProfile(){
        this.connections = [];
    }
}

module.exports = userProfile;