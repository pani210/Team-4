// import express from 'express';
const express=require('express');

const cors=require('cors');

const bodyParser=require('body-parser');

const mongoose=require('mongoose');

const bcrypt=require('bcrypt');

const jwt=require('json-web-token');

const coffeeData=require('./models/coffeeShopsData');

const Registration=require('./models/Registrations');

const RR=require('./models/CoffeeShopReviewsRatings');

const login=require('./models/login');

const multer=require('multer');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
},
filename:function(req,file,cb){
    cb(null,file.originalname);
}
});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'){
        cb(null,true);
    }
    else{
        cb(new Error('message'),false);
    }
    
};
const upload=multer({
    storage:storage
    // limits:{
    // filename:1024*1024*5
    // }
    //  fileFilter:fileFilter
});

const app=express();

const router=express.Router();

app.use(cors());

app.use(bodyParser.json()); 

mongoose.connect('mongodb://localhost:27017/issues');
const connection=mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB connection established successfully")
});
router.route('/coffeeData').get((req,res)=>{
    coffeeData.find((err,coffeeData)=>{
        if(err)
        console.log(err);
        else
        res.json(coffeeData);
    }); 
});
  router.route('/coffeeData/:id').get((req,res)=>{
    coffeeData.findById(req.params.id,(err,coffeeData)=>{
          if(err)
          console.log(err);
          else
          res.json(coffeeData);
      });
  });
   router.route('/coffeeData/add').post((req,res)=>{
       let details=new coffeeData(req.body);
       details.save()
         .then(details=>{
           res.status(200).json({'Data':'Added successfully'});
       })
        .catch(err=>{
            res.status(400).send("Failed to create new record");
        });
   });
   router.route('/coffeeData/update/:id').post((req,res)=>{
    coffeeData.findById(req.params.id,(err,coffeeData)=>{
        if(!coffeeData)
        return next(new Error("couldn't load document"))
        else{
            coffeeData.Name=req.body.Name;
            coffeeData.GSTno=req.body.GSTno;
            coffeeData.Description=req.body.Description;
            coffeeData.Latitude=req.body.Latitude;
            coffeeData.Longitude=req.body.Longitude;
            coffeeData.Timings=req.body.Timings;
            coffeeData.SpecialItems=req.body.SpecialItems;
            coffeeData.Facilities=req.body.Facilities;
            coffeeData.Phone_Number=req.body.Phone_Number;
            coffeeData.Status=req.body.Status;            
            coffeeData.save().then(coffeeData=>{
                res.json('Update done');
            }).catch(err=>{
                res.status(400).send('Update failed');
            });
        }
    });
   });
   router.route('/coffeeData/delete/:id').get((req,res)=>{
    coffeeData.findByIdAndRemove({_id:req.params.id},(err,coffeeData)=>{
        if(err)
        res.json(err);
        else
        res.json("Remove Successfully");
    })
   })

// Registartion/Signup

router.route('/Registrations').get((req,res,next)=>{
    Registration.find((err,Registrations)=>{
        if(err)
        console.log(err);
        else
        res.json(Registrations);
    }); 
});

  router.route('/Registrations/:id').get((req,res)=>{
    Registration.findById(req.params.id,(err,Registrations)=>{
          if(err)
          console.log(err);
          else
          res.json(Registrations);
      });
  });

   router.post('/Registrations/signup',upload.single('profilePic'),(req,res,next)=>{
    // console.log(req.file);
    Registration.find({ Email:req.body.email})
      .exec()
      .then(Regist=>{
          if(Regist.length>=1){
              return res.send(409).json({
                  Message:"Mail Exixts"
              });
          }
          else{
            bcrypt.hash(req.body.Password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    }); 
                }
                    else {
                        const Regist=new Registration({
                        Firstname:req.body.Firstname,
                        Lastname:req.body.Lastname,
                        phonenumber:req.body.phonenumber,
                        DOB:req.body.DOB,
                        Age:req.body.Age,
                        Gender:req.body.Gender,
                        Email:req.body.Email,
                         Password: hash,
                         profilePic:req.file.path
                    });
                    Regist.save()
                    .then(result=>{
                        console.log(result);
                        res.status(201).json({'Message':'Details Added successfully'})
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    });             
          }
      });
    }
});
   });

    // update

//  router.route('/Registrations/update/:id').post((req,res)=>{
//     Registration.findById(req.params.id,(err,Registrations)=>{
//         if(!Registrations)
//         return next(new Error("couldn't load document"));
//         else{
//             Registrations.Firstname=req.body.Firstname;

//             Registrations.Lastname=req.body.Lastname;
//             Registrations.phonenumber=req.body.phonenumber;
//             Registrations.Email=req.body.Email;
//             Registrations.DOB=req.body.DOB;
//             Registrations.Age=req.body.Age;
//             Registrations.Gender=req.body.Gender;
//             Registrations.Password=req.body.Password;          
//             Registrations.save()
//             .then(Registrations=>{
//                 res.json('Update done');
//             }).catch(err=>{
//                 res.status(400).send('Update failed');
//             });
//         }
//     });
// });

    // for deletion
//    router.route('/Registrations/delete/:id').get((req,res)=>{
//     Registration.findByIdAndRemove({_id:req.params.id},(err,Registrations)=>{
//         if(err)
//         res.json(err);
//         else
//         res.json("Remove Successfully");
//     });
// });

// Reviews

router.route('/CoffeeShopReviewsRatings').get((req,res)=>{
    RR.find((err,CoffeeShopReviewsRatings)=>{
        if(err)
        console.log(err);
        else
        res.json(CoffeeShopReviewsRatings);
    }); 
});

router.route('/CoffeeShopReviewsRatings/add').post((req,res)=>{
    let ReRa=new RR(req.body);
    ReRa.save()
      .then(ReRa=>{
        res.status(200).json({'Message':'Reviews and ratings added successfully'});
    })
     .catch(err=>{
         res.status(400).send("Reviews and ratings are not added");
     });
});


// Login Details
 router.route('/Login').post((req,res)=>{
     Registration.find({email:req.body.email})
     .exec()
     .then(Registrations=>{
         if(Registrations.length<1){
             return res.status(401).json({
                 Message:"Authorization failed"
             });
         }

         bcrypt.compare(req.body.Password,Registrations[0].Password,(err,result)=>{
             if(err){
                 return res.send(401).json({
                     Message:'Authorization fails'
                 });
             }
             if(result){
                //  const token=jwt.sign({
                //      Email:Registrations[0].Email,
                //      UserId:Registrations[0]._id
                //  },
                //  'secret',
                //  {
                //      expiresIn:"1hr"
                //  }
                //  )               
                 return res.status(200).json({
                     Message:'Authorization Succesfull',
                    //  token:token
                 });
             }
              res.send(401).json({
                Message:'Authorization fails'
         })
        });
     })
     .catch(err=>{
         console.log(err)
        res.status(500).json({
            error:err
        })
    });
 });

// app.get('/',(req,res)=>res.send("hehe pani"));
app.use('/',router);

app.listen(5000,()=>console.log("express server started")); 