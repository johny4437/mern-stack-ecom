const Product = require("../models/productSchema");
const formidable = require("formidable");
const _ = require('lodash');
var fs = require('fs');
const {errorHandler}= require("../helpers/dbErrorHandler");
exports.create = (request, response)=>{
    let form = new formidable();
    form.KeepExtensions = true;
    form.parse( request, (err, fields, files)=>{
        if(err){
            return response.status(400).json({
                error:"File not uploaded"
            })
        }

        let product = new Product(fields);
        if(files.photo){
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