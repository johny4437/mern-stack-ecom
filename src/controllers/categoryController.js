const Category = require("../models/categorySchema");
const {errorHandler}= require("../helpers/dbErrorHandler")
exports.create = (request, response) =>{
    const category = new Category(request.body);
    category.save((err, data)=>{
        if(err){
            return response.status(400).json({
                error: errorHandler(err) 
            });
        }
        response.json({data})

    });
}