//creates class userInfo with two functions and constructor
class user {

    constructor(userId,firstName, lastName, email, password) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    getUserId(){
    
        return this.userId;
    };
    getFirstName(){
    
        return this.firstName;
    };
    getLastName(){
    
        return this.lastName;
    };
    getEmail(){
    
        return this.email;
    };

}

module.exports = user;
    

    