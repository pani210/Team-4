const mongoose=require('mongoose');


const Schema = mongoose.Schema;

let CoffeeBarRecords = new Schema({
    
    name:  String,
    gstnumber: {
        type: String
    },
    description: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    rating: {
        type: Number
    },
    review: {
        type: [String]
    },
    timing: {
        type: String
    },
    totalitems: {
        type: String
    },
    menucard:{
        type:[{
            _id:{
                _id: mongoose.Schema.Types.ObjectId,
            },
            item:{
                type:String
            },
            ammount:{
                type:String
            }
        }]
    },
    specialitems: {
        type: String
    },
    facilities: {
        type: String
    },
    contactnumber: {
        type:  Number
    },    
    email: {
        type: String
    },

    status: {
        type: String,
        default: 'Open'
    }
});

const Admin=mongoose.model('CoffeeBarRecords',CoffeeBarRecords);
module.exports=Admin;

// const mongoose=require('mongoose');


// const Schema = mongoose.Schema;

// let CoffeeBarRecords = new Schema({
//     _id: mongoose.Schema.Types.ObjectId,
    
//     name:  String,
//     Gstno: {
//         type: String
//     },
//     Description: {
//         type: String
//     },
//     latitude: {
//         type: String
//     },
//     longitude: {
//         type: String
//     },
//     Rating: {
//         type: String
//     },
//     Review: {
//         type: String
//     },
//     Timing: {
//         type: String
//     },
//     SpecialItems: {
//         type: String
//     },
//     Facilities: {
//         type: String
//     },
//     Contactnumber: {
//         type:  Number
//     },    
//     Email: {
//         type: String
//     },

//     Status: {
//         type: String,
//         default: 'Open'
//     }
// });

// const Admin=mongoose.model('CoffeeBarRecords',CoffeeBarRecords);
// module.exports=Admin;

// // const mongoose=require('mongoose');

// // const Schema=mongoose.Schema;
// //  let coffeeData=new Schema({
// //     // _id: mongoose.Schema.Types.ObjectId,
// //     //  _id : String,
// //     _id:{
// //         type: mongoose.Schema.Types.ObjectId
// //     },
// //      Name:{
// //          type:String
// //      },
// //      GSTno:{
// //          type:String
// //      },
// //     //  Description:{
// //     //     type:String
// //     //  },
// //      Latitude:{
// //          type:String
// //      },
// //      Longitude:{
// //          type:String
// //      }, 
// //      Timings:{
// //          type:String
// //      },
// //      SpecialItems:{
// //          type:String
// //      },
// //      Facilities:{
// //          type:String
// //      },
// //      Phone_Number:{
// //          type:String
// //      },
// //      Status:{
// //          type:String
// //      },  
// //      Rating:{
// //          type:String    
// //          },
// //      Review:{
// //          type:String
// //      }
// //     });

// //  const coffee=mongoose.model('coffeeData',coffeeData);
// //  module.exports=coffee;