
var express = require('express');
var bodyParser = require('body-parser');
var routes = express.Router();
routes.use(bodyParser.json());

/* GET home page. */
routes.route('/')
  .get(function (req, res, next) {
    res.json('index: this is the home page');

  });


module.exports = routes;