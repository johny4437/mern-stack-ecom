const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt"); 
const {errorHandler}= require("../helpers/dbErrorHandler")
require('dotenv').config();
exports.singup = (request, response) =>{
    const user = new User(request.body);
        user.save((err, user)=>{
            if(err){
                return response.status(400).json({
                    err: errorHandler(err)
                });
            }

            user.salt = undefined;
            user.hashed_password = undefined;

            response.json({user})

        })
},
exports.singin = async (request, response) =>{
    const{email, password} = request.body;

           await User.findOne({email}, (err, user)=>{
                if(err || !user){
                    return response.json({ err:"User not found, please singup"});
                }
    
                if(!user.authenticate(password)){
                    return response.status(401).json({
                        error: "Email and password dont match"
                    })
                }
                //generate a token
                const  token  = jwt.sign({_id:user._id}, process.env.JWT_SECRET );
                // persist the token
                response.cookie('t',token, {expire: new Date() + 8888});
    
                const{_id, name, email, role} = user;
    
                return response.json({token,user:{_id, name, email, role}});
    
            })
},
exports.singout = (request, response) =>{
    response.clearCookie("t");
    return response.json({message:"Singout Sucess"});
}

exports.requireSingin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty:"auth"
})

exports.isAuth = (request, response, next)=>{
    let user = request.profile && request.auth && request.profile._id == request.auth._id;
    if(!user){
        return response.status(403).json({
            error:"Access Denied"
        })
    }
    next();
}

exports.isAdmin = (request, response, next) =>{
    if(request.profile.role == 0){
        return response.json({
            error:"Admin resource. Access Denied"
        })
    }
    next()
}