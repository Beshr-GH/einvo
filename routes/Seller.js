var express = require('express');
var bodyParser = require('body-parser');
var Sellers = require('../models/SellerModel')
var mongoose = require('mongoose'),
    assert = require('assert');
var Schema = mongoose.Schema;
var sellerRouter = express.Router();
sellerRouter.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;

var db = mongoose.connection;

/* GET home page. */

sellerRouter.route('/')
    .get(function (req, res, next) {
        console.log('sellerRouter');
        Sellers.find({}).sort('_id').exec(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);

        });

    })

    .post(function (req, res, next) {
        console.log('post is posted');
        var Seller = new Sellers(
            {
                Name: req.body.name,
                Phone: req.body.phone,
                Email: req.body.email,
                Password: req.body.password,
                Country: req.body.country,
                City: req.body.city, 
                Address: req.body.Address,
                QRCode : req.body.qrcode,

                _id: new mongoose.Types.ObjectId()
            });

        console.log('Created Seller');
        console.log(Seller);
        Seller.save(function (err) {
            if (err) throw err;
            res.json(Seller);
        });

    })

    .delete(function (req, res, next) {
        console.log('delete was choosed');
        Sellers.remove({ "Name": req.body.name }, function (err, result) {
            if (err) throw err;
            assert.equal(err, null);
            console.log("Removed the Seller " + req.body.com_name);
            res.json('Deleted the Seller' + req.body.com_name)
        })

    });

    sellerRouter.route('/seller/:name')
    .get(function(req,res,next) {
        console.log('find seller by name : ' , req.params.name);
        Sellers.find({'Name':req.params.name},function (err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);

        });
    })


module.exports = sellerRouter;