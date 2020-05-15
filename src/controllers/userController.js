const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt"); 
const {errorHandler}= require("../helpers/dbErrorHandler")
require('dotenv').config();;
module.exports={
    async singup(request, response){
    
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

    async singin(request, response){

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

    }
}