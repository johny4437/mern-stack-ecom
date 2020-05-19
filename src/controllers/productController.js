const Product = require("../models/productSchema");
const formidable = require("formidable");
const _ = require('lodash');
var fs = require('fs');
const {errorHandler}= require("../helpers/dbErrorHandler");


exports.read = (request, response) =>{
    request.product.photo = undefined;
    return response.json(request.product);
}


exports.create = (request, response)=>{
    let form = new formidable();
    form.KeepExtensions = true;
    form.parse( request, (err, fields, files)=>{
        if(err){
            return response.status(400).json({
                error:"File not uploaded"
            })
        }
        // check all fields
        const {name, description, price, category, quantity, shipping} = fields;
        if(!name || !description || !price || !category || !quantity || ! shipping){
            return response.status(400).json({
                error:"All fields are required"
            })
        }

        let product = new Product(fields);
        if(files.photo){
            if(files.photo.size > 1000000){
                return response.status(400).json({
                    error:"Image should be less than 1MB"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType =files.photo.type;
        }

        product.save((err, result)=>{
            if(err){
                return response.status(400).json({
                    error:errorHandler(err)
                })
            }
            return response.status(200).json({result});
        })
    })
};
exports.productId = (request, response, next, id) =>{
    Product.findById(id).exec((err, product)=>{
        if(err || !product){
            return response.status(400).json({
                error:"Product Not Found"
            })
        }
        request.product = product;
        next()
    })
};
exports.remove = (request, response) =>{
    let product = request.product;
    product.remove((err, deletedProduct)=>{
        if(err){
            return response.status(400).json({
                error: errorHandler(err)
            })
        }

        response.json({message:"Product was removed"})
    })
};
exports.update = (request, response) =>{
    let form = new formidable();
    form.KeepExtensions = true;
    form.parse( request, (err, fields, files)=>{
        if(err){
            return response.status(400).json({
                error:"File not uploaded"
            })
        }
        // check all fields
        const {name, description, price, category, quantity, shipping} = fields;
        if(!name || !description || !price || !category || !quantity || ! shipping){
            return response.status(400).json({
                error:"All fields are required"
            })
        }

        let product = request.product;
        product = _.extend(product, fields);
        if(files.photo){
            if(files.photo.size > 1000000){
                return response.status(400).json({
                    error:"Image should be less than 1MB"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType =files.photo.type;
        }

        product.save((err, result)=>{
            if(err){
                return response.status(400).json({
                    error:errorHandler(err)
                })
            }
            return response.status(200).json({result});
        })
    })
}

/**
 * sell/ Arrival
 */