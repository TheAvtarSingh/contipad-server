const express = require('express');
const UserRouter = express.Router();

const bcrypt = require('bcryptjs');
const Users = require('../Models/Users');


UserRouter.post('/signup-user',(req,res)=>{
    const {name,email,password,phoneNumber} = req.body;
    if(!name || !email || !password || !phoneNumber){
        return res.status(400).json({error:"Please Fill All The Fields"});
    }
    else{
        Users.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                return res.status(200).json({error:"User Already Exists"});
            }
            else{
                bcrypt.hash(password,10)
                .then((hashedPassword)=>{
                    const user = new Users({
                        name,
                        email,
                        passwordHash:hashedPassword,
                        phoneNumber,
                    });
                    user.save()
                    .then((user)=>{
                        res.json({message:"User Saved Successfully"});
                    })
                    .catch((err)=>{
                         res.status(500).json({error:err});
                    });
                })
                .catch((err)=>{
                     res.status(500).json({error:err});
                });
            }
        })
        .catch((err)=>{
             res.status(500).json({error:err});
        });
    }

   
});


UserRouter.post('/login-user',(req,res)=>{

    const {email,password} = req.body;
   
    if(!email || !password ){
        return res.status(400).json({error:"Please Fill All The Fields"});
    }else{
        Users.findOne({email:email})
        .then((savedUser)=>{
            if(!savedUser){
                return res.status(200).json({error:"User Not Found"});
            }
            else{
                bcrypt.compare(password,savedUser.passwordHash)
                .then((isMatch)=>{
                    if(isMatch){
                        res.json({message:"User Logged In Successfully",savedUser});
                    }
                    else{
                        res.status(200).json({error:"Invalid Credentials"});
                    }
                })
                .catch((err)=>{
                     res.status(200).json({error:err});
                });
            }
        })
        .catch((err)=>{
             res.status(200).json({error:err});
        });
    }
});

module.exports = UserRouter;