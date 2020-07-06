const Category = require("../models/categorySchema");
const {errorHandler}= require("../helpers/dbErrorHandler");


exports.categoryById = (request, response, next, id) =>{
    Category.findById(id).exec((err, category)=>{
        if(err || !category){
            return response.status(400).json({
                error:"Category wasn't found"
            })
        }

        request.category = category;
        next();
    })
}


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
};

exports.read = (request, response) =>{
    return response.json(request.category);
};

exports.update = (request,response) =>{
    const category = new Category(request.body);
    category.save((err, result)=>{
        if(err){
            return response.status(400).json({
                error:errorHandler(err)
            })
        }
        response.json({result})
    });
};

exports.remove =(request, response)=>{
    let category = request.category;
    category.remove((err, deletedCategory)=>{
        if(err){
            return response.status(400).json({
                error: errorHandler(err)
            })
        }

        response.json({message:"Category was removed"})
    })
}

exports.list = (request, response) =>{
    Category.find().exec((err,data)=>{
        if(err){
            return response.status(400).json({
                error:errorHandler(err)
            })
        }
        response.json(data)
    })
}