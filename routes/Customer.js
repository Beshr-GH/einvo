var express = require('express');
var bodyParser = require('body-parser');
//var Projects = require('../models/ProjectModel.js')
var Customers = require('../models/CustomerModel.js')
var mongoose = require('mongoose'),
    assert = require('assert');
var Schema = mongoose.Schema;
var customerRouter = express.Router();
customerRouter.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;

var db = mongoose.connection;

/* GET home page. */

customerRouter.route('/')
    .get(function (req, res, next) {
        console.log('customerRouter');
        Customers.find({}).sort('_id').exec(function (err, result) {
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
        var customer = new Customers(
            {
                Name: req.body.name,
                Phone: req.body.phone,
                Email: req.body.email,
                Address: req.body.address,
             
                QRCode: req.body.qrcode,
               

                _id: new mongoose.Types.ObjectId()
            });

        console.log('Created Profile');
        console.log(customer);
        customer.save(function (err) {
            if (err) {
                console.log("Error : " , err)
                throw err
            };
            res.json('added the newProfile \n' + customer);
        });

    })

    .delete(function (req, res, next) {
        console.log('delete was choosed');
        Customers.remove({ "Name": req.body.name }, function (err, result) {
            if (err) {
                console.log("Error : " , err)
                throw err
            };
            assert.equal(err, null);
            console.log("Removed the Profile " + req.body.name);
            res.json('Deleted the Profile' + req.body.name)
        })

    });
    customerRouter.route('/:customer')
    .get(function (req, res, next) {
        Customers.find({ 'Name': req.params.customer }, function (err, result) {
            if (err) {
                console.log("Error : " , err)
                throw err
            };
            console.log("find parameter is " + req.params.customer)
            console.log(result);
            res.json(result);
        })
    });
/*db.dropCollection("hobbies", function(err, result){ 
    assert.equal(err,null); 
    
 });*/


module.exports = customerRouter;