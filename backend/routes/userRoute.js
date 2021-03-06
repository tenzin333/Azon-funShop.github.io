import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';


const  router =express.Router();


router.post('/register',async (req,res)=>{
    const user = await User({
        name:req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const newUser = await user.save();
    
    if(newUser){
       res.send({
       id:newUser.id,
       name:newUser.name, 
       email:newUser.email, 
       isAdmin:newUser.isAdmin,
       token:getToken(newUser)
       });
    }else{
        res.status(401).send({msg: "Invalid User details"});
    }

})

router.post('/signin',async (req,res)=>{
     const signinUser = await User.findOne({
         email: req.body.email,
         password: req.body.password
     });
     
     if(signinUser){
        res.send({
        id:signinUser.id,
        name:signinUser.name, 
        email:signinUser.email,
        isAdmin:signinUser.isAdmin,
        token:getToken(signinUser)
        });
     }else{
         res.status(401).send({msg: "Invalid Email or Password"});
     }

})

router.get("/createAdmin",async(req,res)=> 
{  
    try{
  const user = new User({
            name: 'Admin',
            email: 'admin@gmail.com',
            password: 'admin',
            isAdmin:true
        });


        const newUser = await user.save();
        res.send(user); 
    }catch(error){
        res.send({msg: error.message});

    }


      
})

export default router;