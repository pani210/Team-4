const mongoose=require('mongoose');

const Schema=mongoose.Schema;

let Register=new Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
Firstname:{
    type:String
},
Lastname:{
    type:String
},
phonenumber:{
    type:String
},
DOB:{
    type:String
},
Age:{
    type:String
},
Gender:{
   type:String
},
Email:{
    type:String
    //  required:true,
    //  unique:true,
    //  match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
},
Password:{
    type:String
    //  required:true,
},
//  profilePic:{
//      type:String,
//      required:true
//  }

favouritebars:{
    type:[String]
}

});

const coffee=mongoose.model('Register',Register);
module.exports=coffee;