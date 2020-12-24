const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const UrlAndKeyword = require('../models/UrlKeyword');
const UrlKeyword = require('../models/UrlKeyword');

const signToken = userID => {
    return JWT.sign({
        iss : "chaudhary",
        sub : userID
    }, "chaudhary",{expiresIn : "1h"});
}
userRouter.post('/register',(req,res)=>{
    const { username,password} = req.body;
    User.findOne({username},(err,user)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        if(user)
            res.status(400).json({message : {msgBody : "Username is already taken", msgError: true}});
        else{
            const newUser = new User({username,password});
            newUser.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                else
                    res.status(201).json({message : {msgBody : "Account successfully created", msgError: false}});
            });
        }
    });
});

userRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated())
    {
        const {_id,username} = req.user;
        const token = signToken(_id);
        res.cookie('access_token',token,{httpOnly : true, sameSite : true});
        res.status(200).json({isAuthenticated : true, user : {username}});
    }
});

userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
   
    res.clearCookie('access_token');
    res.json({user: {username : ""},success : true});
});

userRouter.post('/urlkeyword',passport.authenticate('jwt',{session : false}),(req,res)=>{

    const link = req.body;

    // const arrayOfArrays = [link,"apple", "unavailable"];

    const url = new UrlKeyword(link);
    
    // const keyword = 'apple';

  

    url.save(err=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else {
            req.user.LinkKeyword.push(url);
            req.user.save(err=>{
            if(err)
                res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
            else
                res.status(200).json({message : {msgBody : "Successfully created UrlKeywordPair", msgError: false}});
    });
        }

    })
    

});

userRouter.get('/listurlkeyword',passport.authenticate('jwt',{session : false}),(req,res)=>{
    User.findById({_id : req.user._id}).populate('LinkKeyword').exec((err,document)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            res.status(200).json({urls : document.LinkKeyword, authenticated : true});
        }
    });
});

userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const username = req.user.username;
    res.status(200).json({isAuthenticated : true, user : username});
});


module.exports = userRouter;