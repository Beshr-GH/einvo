var express = require('express');
var bodyParser = require('body-parser');
//var Projects = require('../models/ProjectModel.js')
var Admins = require('../models/AdminModel')
var mongoose = require('mongoose'),
    assert = require('assert');
var Schema = mongoose.Schema;
var adminRouter = express.Router();
adminRouter.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;

var db = mongoose.connection;

/* GET home page. */

adminRouter.route('/')
    .get(function (req, res, next) {
        console.log('adminRouter');
        Admins.find({}).sort('_id').exec(function (err, result) {
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
        var admin = new Admins(
            {
                Name: req.body.name,
                Email: req.body.email,
                Password: req.body.pass,
                

                _id: new mongoose.Types.ObjectId()
            });

        console.log('Created admin');
        console.log(admin);
        admin.save(function (err) {
            if (err) {
                console.log("Error : " , err)
                throw err
            };
            res.json('added the newAdmin \n' + admin);
        });

    })

    .delete(function (req, res, next) {
        console.log('delete was choosed');
        Admins.remove({ "_id": req.body._id }, function (err, result) {
            if (err) {
                console.log("Error : " , err)
                throw err
            };
            assert.equal(err, null);
            console.log("Removed the admin " + req.body.name);
            res.json('Deleted the admin' + req.body.name)
        })

    })
    .put(function (req, res, next) {
        Admins.findByIdAndUpdate( req.body._id ,{$set:req.body}, {new : true}, function (err, result) { 
            if (err) {
                console.log("Error : " , err)
                throw err
            };
            console.log("Updated Result",result);
            // result = req.body;
            // result.save(function (err) {
            //     if (err)
            //         throw err;
            // });
           res.json(result)
        });
        // Admins.findById( req.body._id , function (err, result) {
        //     if (err) {
        //         console.log("Error : " , err)
        //         throw err
        //     };
        //     console.log("find parameter is " + req.body._id)
        //     console.log(result);
        //     res.json(result);
        // })
    });
    adminRouter.route('/id/:admin')
    .get(function (req, res, next) {
        Admins.findById( req.params.admin , function (err, result) {
            if (err) {
                console.log("Error : " , err)
                throw err
            };
            console.log("find parameter is " + req.params.admin)
            console.log(result);
            res.json(result);
        })
    })
    
   
/*db.dropCollection("hobbies", function(err, result){ 
    assert.equal(err,null); 
    
 });*/


module.exports = adminRouter;