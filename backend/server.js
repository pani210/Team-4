const express=require('express');

const cors=require('cors');

const bodyParser=require('body-parser');

const mongoose=require('mongoose');

const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');

const coffeeData=require('./models/coffeeShopsData');

const Registration=require('./models/Registrations');

// const RR=require('./models/CoffeeShopReviewsRatings');

const login=require('./models/login');

// const geolib=require('geo-lib');

const geolib=require('geolib');

const MY_COORDS={latitude:16.4651,longitude:79.4204};

// const path=require('path');

// const multer=require('multer');

// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'./uploads/');
// },
// filename:function(req,file,cb){
//     cb(null,file.originalname);
// }
// });
// const fileFilter=(req,file,cb)=>{
//     if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'){
//         cb(null,true);
//     }
//     else{
//         cb(new Error('message'),false);
//     }
    
// };
// const upload=multer({
//     storage:storage
    // limits:{
    // filename:1024*1024*5
    // }
    //  fileFilter:fileFilter
// });

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
        if(err){
            console.log(err);
        } 
        else{
            console.log(coffeeData)
            res.json(coffeeData);
        }
    }); 
});
  router.route('/coffeeData/:_id').get((req,res)=>{
    coffeeData.findById(req.params._id,(err,coffeeDataa)=>{
          if(err){
              console.log(err);
            }
          else{
              res.json(coffeeDataa);
            } 
        console.log(coffeeDataa);
        });
  });
   router.route('/coffeeData/add').post((req,res)=>{
    let issue = new coffeeData(req.body);
    console.log(coffeeData);
    issue.save()
        .then(issue => {
            console.log(issue)
            res.status(200).json({
                'issue': 'Added successfully'
            });
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
   });
   router.route('/coffeeData/update/:id').post((req,res)=>{
    coffeeData.findById(req.params.id,(err,coffeeData)=>{
        if(!coffeeData)
        return next(new Error("couldn't load document"))
        else{
            coffeeData.name=req.body.name;
            coffeeData.gstno=req.body.gstno;
            coffeeData.description=req.body.description;
            coffeeData.latitude=req.body.latitude;
            coffeeData.longitude=req.body.longitude;
            coffeeData.rating=req.body.rating;
            coffeeData.review=req.body.review;
            coffeeData.timing=req.body.timing;
            coffeeData.specialitems=req.body.specialitems;
            coffeeData.facilities=req.body.facilities;
            coffeeData.contactnumber=req.body.contactnumber;
            coffeeData.email=req.body.email;
            coffeeData.status=req.body.status;
            

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
      console.log(req.params.id);
      Registration.findById(req.params.id,(err,issue)=>{
        if (err){
            console.log(err);
        }
        else{
            res.json(issue);
        }  
      });
  });

   router.post('/Registrations/signup',(req,res,next)=>{
    // console.log(req.file);
    Registration.find({ Email:req.body.email})
      .exec()
      .then(Regist=>{
          if(Regist.length>=1){
              return res.send(409).json({
                  Message:"Mail Exists"
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
                        _id:new mongoose.Types.ObjectId(),
                        Firstname:req.body.Firstname,
                        Lastname:req.body.Lastname,
                        phonenumber:req.body.phonenumber,
                        DOB:req.body.DOB,
                        Age:req.body.Age,
                        Gender:req.body.Gender,
                        Email:req.body.Email,
                         Password: hash,
                        //  profilePic:req.file.path
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

   app.post('/userprofile/updatefavbar/:id', (req, res) => {  
    Registration.findById(req.params.id, (err, user) => {
        if (!user)
            return new Error('Could not load document');
        else {
          x=[];
          x=user.favouritebars;
          x.push(req.body.shopid);
          user.set('favouritebars',x).save().then(user=>{
            res.json("Value = "+x);
          }).catch(err => {
            console.log(err)
          })
        }
    })
});

app.post('/userprofile/removefavbar/:id', (req, res) => {  
    Registration.findById(req.params.id, (err, user) => {  
        if (!user)
            return new Error('Could not load document');
        else {
          x=[];
          x=user.favouritebars;
          value=req.body.shopid;
          index=x.indexOf(value);
          x.splice(index,1);
          console.log(x)
          user.set('favouritebars',x).save().then(user=>{
              res.json("Value removed was = "+value);
              console.log(x);
            }).catch(err => {
              console.log(err)
            })        
        }      
    })
});

app.get('/userprofile/findfavbar/:id',(req,res)=>{
    console.log('Requesting user with id:', req.params.id);
    Registration.findById(req.params.id, (err, user) => {
        if (err){
            console.log("caught an err : "+err);
        }
        else{
        x=[];
        x=user.favouritebars;
        res.json(x);
        }
    })
})

    // update

 router.route('/Registrations/update/:_id').post((req,res)=>{
    Registration.findById(req.params._id,(err,Registrations)=>{
        if(!Registrations)
        return next(new Error("couldn't load document"));
        else{
            Registrations.Firstname=req.body.Firstname;
            Registrations.Lastname=req.body.Lastname;
            Registrations.phonenumber=req.body.phonenumber;
            Registrations.DOB=req.body.DOB;
            Registrations.Age=req.body.Age;
            Registrations.Gender=req.body.Gender;
            Registrations.Email=req.body.Email;                       
            Registrations.Password=req.body.Password,
            // Registrations.profilePic=req.body.profilePic;
            Registrations.save()
            .then(Registrations=>{
                res.json('Update done');
            }).catch(err=>{
                res.status(400).send('Update failed');
                console.log(err);
            });
        }
    });
});

    // for deletion
   router.route('/Registrations/delete/:id').get((req,res)=>{
    Registration.findByIdAndRemove({_id:req.params.id},(err,Registrations)=>{
        if(err)
        res.json(err);
        else
        res.json("Remove Successfully");
    });
});

// Reviews

// router.route('/CoffeeShopReviewsRatings').get((req,res)=>{
//     RR.find((err,CoffeeShopReviewsRatings)=>{
//         if(err)
//         console.log(err);
//         else
//         res.json(CoffeeShopReviewsRatings);
//     }); 
// });

// router.route('/CoffeeShopReviewsRatings/add').post((req,res)=>{
//     let ReRa=new RR(req.body);
//     ReRa.save()
//       .then(ReRa=>{
//         res.status(200).json({'Message':'Reviews and ratings added successfully'});
//     })
//      .catch(err=>{
//          res.status(400).send("Reviews and ratings are not added");
//      });
// });


// Login Details
 router.route('/Login').post((req,res)=>{
    Registration.find({Email:req.body.Email})
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
                 const token=jwt.sign({
                     Email:Registrations[0].Email,
                     UserId:Registrations[0]._id
                 },
                 'secret',
                 {
                     expiresIn:"1h"
                 }
                 )               
                 return res.status(200).json({
                    Registrations:Registrations,
                     Message:'Authorization Succesfull',
                     token:token
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
 router.route('/nearby').get((req,res)=>{
    coffeeData.find((err,coffeeData)=>{
        if(err){
            console.log(err);
        }
        else{
            var k;
            let coordinates={
                latitude:coffeeData.latitude,
                longitude:coffeeData.longitude,
                name:coffeeData.name
            };
               res.json(coffeeData);
            }
        // console.log(coffeeData);
      })
});
// app.get('/barsnearus',())

router.route('/coffeeshopmaps/:_id').get((req,res)=>{
    console.log('requesting',req.params._id);
    coffeeData.findById(req.params._id,(err,coffee)=>{
        // const coordinates={
        //         latitude:coffee.latitude,
        //         longitude:coffee.longitude,
        //         Name:coffee.name
        // };
        // if(err){
        //     console.log(err);
        // }
        // else{
        //        res.json(coordinates);
        //     }
        // console.log(coffee);
        res.json(coffee);
      })
});

// ================================================REVIEWS===================================
// adding review
app.post('/coffeeshopdata/addreview/:id', (req, res) => {
  
    coffeeData.findById(req.params.id, (err, user) => {

        if (!user)
            return new Error('Could not load document');
        else {
          l=[];
          l=user.review;
          l.push(req.body.uname+" : "+req.body.review);
          user.set('review',l).save().then(user=>{
            res.json({'message':'review added successfully'});
          })
          .catch(err => {
            console.log(err) 
          })

        }
    })
})

// ===========R A T I N G============
app.post('/coffe/addrating/:id', (req, res) => {
  
    coffeeData.findById(req.params.id, (err, user) => {
        if (!user)
            return new Error('Could not load document');
        else {
            b=user.rating;
            value=req.body.value;
            console.log(b,value);
            ratevalue=(b+value)/2;
            updatedresult=ratevalue.toFixed(2);
            console.log(updatedresult);
            user.set('rating',updatedresult).save().then(user=>{
                res.json({'message':'rating updated success'});
            }).catch(err => {
                    console.log(err)
            })
        }
    })
})


// app.get('/',(req,res)=>res.send("hehe pani"));
app.use('/',router);

app.listen(5000,()=>console.log("express server started")); 