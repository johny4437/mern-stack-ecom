const User = require("../models/userSchema");

exports.userById = (request, response, next, id) =>{
        User.findById(id).exec((err, user)=>{
            if(err || !user){
                return response.status(400).json({error: "User not found"})
            }
            request.profile = user;
            next();
        })
    };

exports.read = (request, response)=>{
    request.profile.hashed_password = undefined;
    request.profile.salt = undefined;

    return response.json(request.profile);
};

exports.update = (request, response) => {
    User.findOneAndUpdate({_id: request.profile._id},{$set:request.body},{new:true}, (err, user)=>{
        if(err){
            return response.json({
                error:"you not authorized to take this action"
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;

        response.json(user);

    });
}
