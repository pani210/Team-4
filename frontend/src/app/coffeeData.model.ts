export interface Data{
    // _id: mongoose.Schema.Types.ObjectId,

    _id:{
        type:String
    },
    name:String,
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
        type: String
    },
    review: {
        type: [String]
    },
    timing: {
        type: String
    },
    totalitems: {
        type: String
    },menucard:{
        type:[{
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
    }
    }