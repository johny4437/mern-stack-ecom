const User = require("../models/userSchema");

module.exports = {
    userById(request, response, next, id){
        User.findById(id).exec((err, user)=>{
            if(err || !user){
                return response.status(400).json({error: "User not found"})
            }
            request.profile = user;
            next();
        })
    }
}