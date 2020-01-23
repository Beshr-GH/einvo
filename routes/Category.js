var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose'),
    assert = require('assert');
var Categories = require('../models/CategoryModel');
var Schema = mongoose.Schema;
var categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
var db = mongoose.connection;

categoryRouter.route('/')

    .get(function (req, res, next) {
        console.log('Getting All Categories');

        Categories.find({ }, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);

        });

    })
    .post(function (req, res, next) {
        console.log('post is posted');
        var category = new Categories(
            {
                Name: req.body.name,
                Info: req.body.info,
         
                _id: new mongoose.Types.ObjectId()
            });

        console.log('Created category');
        console.log(category);
        category.save(function (err) {
            if (err) throw err;
            res.json('added the newcategory \n' + category);
        });

    })

    categoryRouter.route('/category/:name')

    .get(function (req, res, next) {
        console.log('Searching by name', req.params.name);

        Categories.find({ 'Name': req.params.name }, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);

        });

    })

    categoryRouter.route('/id/:id')
    .get(function (req, res, next) {
        Categories.findById( req.params.id , function (err, result) {
            if (err) {
                console.log("Error : " , err)
                throw err
            };
            console.log("find parameter is " + req.params.id)
            console.log(result);
            res.json(result);
        })
    })

  



module.exports = categoryRouter;