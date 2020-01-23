var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose'),
    assert = require('assert');
var Invoices = require('../models/InvoiceModel');
var Schema = mongoose.Schema;
var InvoiceRouter = express.Router();
InvoiceRouter.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
var db = mongoose.connection;

InvoiceRouter.route('/')

    .get(function (req, res, next) {
        console.log('Get All Invoices');

        Invoices.find({}).sort('_id').exec(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);

        });

    })
    .post(function (req, res, next) {
        console.log('post is posted');
        var Invoice = new Invoices(
            {
                Date: req.body.date,
                Products: req.body.product,
                Seller : req.body.seller,
                Customer : req.body.customer,
                QRCode : req.body.qrcode,
                Total_Sum :  req.body.total,

                _id: new mongoose.Types.ObjectId()
            });

        console.log('Created Invoice');
        console.log(Invoice);
        Invoice.save(function (err) {
            if (err) throw err;
            res.json('added the newInvoice \n' + Invoice);
        });

    })

    InvoiceRouter.route('/id/:id')
    
    .get(function (req, res, next) {
        console.log('Searching by ID', req.params.id);

        Invoices.find({ '_id': req.params.id }, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);

        });

    })

    .put(function (req, res, next) {
        console.log("put was choosed");
        Invoices.find({ '_id': req.params.id }, function (err, result) {
            if (err) throw err;
            console.log(result);
            result.Products = req.body.products;
            result.save(function (err) {
                if (err)
                    throw err;
            });
            console.log("Invoice Info was updated")
        });
    });

    InvoiceRouter.route('/product/:proname')

    .get(function (req, res, next) {
        console.log('Searching by Product', req.params.proname);

        Projects.find({ 'Products.product': {'$regex' : new RegExp(".*"+req.params.proname+".*" , "i")  }}, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);

        });

  
    })

  



module.exports = InvoiceRouter;