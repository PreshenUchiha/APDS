
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const brcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup',(req,res)=>{
// https://www..npmjs.com/package/bcrypt
    brcrypt.hash(req.body.password,10)
    .then(hash=>{
        const user = new User(
            {
                username: req.body.username,
                password: hash
            }
        )
        user.save().then(()=>{
           res.status(201).json({
               message: "User created",
               user: user
           })
    
        })
        .catch(err=> {
            res.status(500).json({
                error:err
            })
        })
    })
    
})

router.post('/login',(req,res)=>{
    let fetchedUser;
    User.findOne({username:req.body.username})
    .then(user=>{
        if(!user){
            return res.status(401).json({
                message: "Authentication Failure, No user"
            })
        }
        fetchedUser = user;
        console.log()
        return brcrypt.compare(req.body.password,user.password)
    })
    .then(result=>{
        
        if(!result){
            return res.status(401).json({
                message:"Authentication Failure, No result"
            })
        }

        const token = jwt.sign({username:fetchedUser.username,userid:fetchedUser.userid},
            'Secret_this_should_be_longer_than_it_is',{expiresIn:'1h'});
            res.status(200).json({token:token});
    })
    .catch(err=>{
        return res.status(200).json({
            message:"Authentication failure, Catch error"
        })
    })
})

module.exports = router