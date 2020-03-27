//creates class userInfo with two functions and constructor
class userConnection {

    constructor(connection, rsvp) {
        this.connection = connection;
        this.rsvp = rsvp;
    }

    getConnection(){
        return this.connection;
    };
    getRsvp(){
        return this.rsvp;
    };
    setRsvp(status){
    
        this.rsvp = status;
    };
}

module.exports = userConnection;