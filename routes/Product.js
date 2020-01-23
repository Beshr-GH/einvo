var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose'),
    assert = require('assert');
var Products = require('../models/ProductModel');
var Schema = mongoose.Schema;
var ProductRouter = express.Router();
ProductRouter.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
var db = mongoose.connection;

ProductRouter.route('/')

    .get(function (req, res, next) {
        console.log('Get All Prodcuts');

        Products.find({}).sort('_id').exec(function (err, result) {
            if (err) {
                console.log("Error : " , err)
                throw err
            };
            console.log(result);
            res.json(result);

        });

    })
    .post(function (req, res, next) {
        console.log('post is posted');
        var product = new Products(
            {
                Name: req.body.name,
                Info: req.body.info,
                Category : req.body.category,
                QRCode : req.body.qrcode,

                _id: new mongoose.Types.ObjectId()
            });

        console.log('Created product');
        console.log(product);
        product.save(function (err) {
            if (err) {
                console.log("Error : " , err)
                throw err
            };
            res.json('added the newproduct \n' + product);
        });

    });

ProductRouter.route('/name/:proname')

    .get(function (req, res, next) {
        console.log('Searching by Name', req.params.proname);

        Products.find({ 'Name': {'$regex' : new RegExp(".*"+req.params.proname+".*" , "i")  }}, function (err, result) {
            if (err) {
                console.log("Error : " , err)
                throw err
            };
            console.log(result);
            res.json(result);

        });

    })

   
    .put(function (req, res, next) {
        console.log("put was choosed");
        Products.find({ 'Name': req.params.proname }, function (err, result) {
            if (err) throw err;
            console.log(result);
            result.Info = req.body.info;
            result.save(function (err) {
                if (err)
                    throw err;
            });
            console.log("Product Info was updated")
        });
    });

    // ProductRouter.route('/buyer/:proname')

    // .get(function (req, res, next) {
    //     console.log('Searching by Buyer', req.params.proname);

    //     Projects.find({ 'Buyer': {'$regex' : new RegExp(".*"+req.params.proname+".*" , "i")  }}, function (err, result) {
    //         if (err) throw err;
    //         console.log(result);
    //         res.json(result);

    //     });

    // })
    // ProductRouter.route('/category/:proname')

    // .get(function (req, res, next) {
    //     console.log('Searching by category', req.params.proname);

    //     Products.find({ 'Category': {'$regex' : new RegExp(".*"+req.params.proname+".*" , "i")  }}, function (err, result) {
    //         if (err) throw err;
    //         console.log(result);
    //         res.json(result);

    //     });

    // })
    
    // ProductRouter.route('/seller/:idea')

    // .get(function (req, res, next) {
    //     console.log('Searching by seller', req.params.idea);

    // Projects.find({ 'Seller': {'$regex' : new RegExp(".*"+req.params.idea+".*" , "i")  }},function (err, result) {
    //         if (err) throw err;
    //         console.log(result);
    //         res.json(result);

    //     });

    // })

  



module.exports = ProductRouter;