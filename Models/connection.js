//creates class convention with an constructor
class connection {

    constructor(userId, conventionId, host, name, location, time) {
        this.userId = userId;
        this.conventionId = conventionId;
        this.host = host;
        this.name = name;
        this.location = location;
        this.time = time;
    }
    //getter for Id
    getId() {
        return this.conventionId;
    }
    //getter for host
    getHost() {
        return this.host;
    }

}
module.exports = connection;