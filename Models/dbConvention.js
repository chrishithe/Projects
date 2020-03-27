//requiring mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Ckventions', {useNewUrlParser: true}); //Students creates the database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//we're connected

//mongoose data
var Schema = mongoose.Schema;
var conventionInfo = new Schema({
    userId: {type: String, required:true},
    conventionId: {type: Number, required:true},
    host: {type: String, required: true},
    name: {type: String, required: true},
    location: {type: String, required: true},
    time: {type: String, required: true},
    price: {type: String, required: true},
    image: {type: String},
}, {collection: 'conventionsInfo'});

//Database for convention(connection) Information
var conventionDB = mongoose.model('conventionsInfo', conventionInfo);


//creates class conventionDb with two functions and constructor
class conventionDb {

    constructor() {
        
    }
    getConventions(){
        return conventionDB.find({});
    }
    getConventionsById(id){
        return conventionDB.find({userId:id});  
    }
    getConventionById(id){
        return conventionDB.find({_id:id});  
    }
    addConvention(userId, host, name, location, time, price){
        var conventionDB = mongoose.model('conventionsInfo', conventionInfo);
        var convention = new conventionDB({userId:userId, conventionId: '1', host:host, name:name, location:location, time:time, price:price, image:"Assets/IMG/owner.jpg"});
        convention.save();
    }
    removeConventionById(id){
        conventionDB.deleteOne({_id:id}).exec((err, docs)=>{
            
        });
    }
}

module.exports = conventionDb;