//Database for object properties 
const conventions = [{conventionId: '1', img: "Assets/IMG/owner.jpg", host: 'Tom John', name: 'Kickz R Us',
location: 'New York, New York', time: '10am', price: '$50'},
{conventionId: '2', host: 'Tom John', img: "Assets/IMG/owner.jpg", name: 'Yorkies Shoe Convention',
location: 'New York, New York', time: '10am', price: '$50'},
{conventionId: '3', host: 'Tom John', img: "Assets/IMG/owner.jpg", name: 'BST Convention',
location: 'New York, New York', time: '10am', price: '$50'},
{conventionId: '4', host: 'Kimberly Styles', img: "Assets/IMG/owner2.jpg", name: 'S.O.E',
location: 'Charlotte, North Carolina', time: '10am', price: '$40'},
{conventionId: '5', host: 'Kimberly Styles', img: "Assets/IMG/owner2.jpg", name: 'Kim Kickz Convention',
location: 'Charlotte, North Carolina', time: '10am', price: '$40'},
{conventionId: '6', host: 'Kimberly Styles', img: "Assets/IMG/owner2.jpg", name: 'H.O.E',
location: 'Charlotte, North Carolina', time: '10am', price: '$40'}]



//creates class conventionDb with two functions and constructor
class conventionDb {

    constructor() {
        this.conventions = conventions;
    }

    getConventions(){
    
        return this.conventions;
    };
    getConvention(conventionId){
        
        for(var x = 0; x < this.conventions.length; x++) {
            var temp = '';
            if(this.conventions[x].conventionId === conventionId) {
                return this.conventions[x];
            } 
        }
        
    }
}

module.exports = conventionDb;
    

    