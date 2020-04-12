const mongoose=require('mongoose');

const Schema=mongoose.Schema;

let ReviewsRatings= new Schema({
    Review:{
        type:String
    },
    Rating:{
        type:String
    }
});
const coffee=mongoose.model('ReviewsRatings',ReviewsRatings);
 module.exports=coffee;