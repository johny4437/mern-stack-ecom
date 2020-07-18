const Product = require("../models/productSchema");
const formidable = require("formidable");
const _ = require('lodash');
var fs = require('fs');
const {errorHandler}= require("../helpers/dbErrorHandler");
const { request } = require("http");


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
 * by sell = /products?sortBy=sold&oerder=desc&limit=4
 * by arrival = /products?sortBy=sold&createdAt=desc&limit=4
 */

 exports.list = (request,response) =>{
     let order = request.query.order ? request.query.order:'asc';
     let sortBy = request.query.sortBy ? request.query.sortBy:'_id'; 
     let limit = request.query.limit ? parseInt(request.query.limit):6;
     Product.find()
     .select("-photo")
     .populate('category')
     .sort([[sortBy, order]])
     .limit(limit)
     .exec((err, products)=>{
         if(err){
             return response.status(400).json({
                 error: "Product not found"
             })
         }
         response.json(products)
     }) 
 };

/**
 * it will find the product based on Category
 * other product that have the same category will be returned
 */
exports.listRelated = (request, response) =>{
    let limit = request.query.limit ? parseInt(request.query.limit):6;

    Product.find({_id:{$ne: request.product}, category: request.product.category})
    .limit(limit)
    .populate('category', '_id name')
    .exec((err,products) =>{
        if(err){
            return response.status(400).json({
                error: "Product not found"
            })
        }
        response.json(products)

    })
};

exports.listCategories = (request,response) =>{
    Product.distinct('category',{},(err, categories)=>{
        if(err){
            return response.status(400).json({
                error: "Categorie not found"
            })
        }
        response.json(categories);

    
    })  
};
/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
 
// route - make sure its post

 
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

exports.photo = (request, response, next) =>{
    if(request.product.photo.data){
         response.set('Content-Type', request.product.contentType);
         return response.send(request.product.photo.data)
    }
    next();
    
}

exports.listSearch = (request, response) =>{
    const query = {};

    if(request.query.search){
        query.name ={$regex: request.query.search, $options:"i"}

        if(request.query.category && request.query.category != 'All'){
            query.category = request.query.category
        }

        Product.find(query,(err, products)=>{
            if(err){
                return response.status(400).json({
                    error:errorHandler(err)
                })
            }
            response.json(products)
        }).select("-photo")
    }
}