export interface Issue{
    _id:String,
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
        // required:true,
        // unique:true,
        // match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    Password:{
        type:String
        // required:true,
    },
    favouritebars:{
        type:[String]
    }
}