const mongoose=require('mongoose');

const Schema=mongoose.Schema;
 let coffeeData=new Schema({
     Name:{
         type:String
     },
     GSTno:{
         type:String
     },
     Description:{
        type:String
     },
     Latitude:{
         type:String
     },
     Longitude:{
         type:String,
     },
     Timings:{
         type:String
     },
     SpecialItems:{
        type:String
     },
     Facilities:{
         type:String
     },
     Phone_Number:{
         type:Number
     },
     Status:{
         type:String
     },  
    });

 const coffee=mongoose.model('coffeeData',coffeeData);
 module.exports=coffee;