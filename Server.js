var express = require('express');
var passport = require('passport');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose'),
  assert = require('assert');

var externalip = require('externalip');
var http = require('http');
var compression = require('compression');
var helmet = require('helmet');

// var home = require('./routes/index');

var session = require("express-session");
var Customer = require('./routes/Customer');
var Admin = require('./routes/Admin')
var Category = require('./routes/Category')
var Product = require('./routes/Product')
var Seller = require('./routes/Seller');
var Invoice = require('./routes/Invoice');

// var hostname = 'localhost';
var hostname = '82.165.65.78';

var port = 8082;
var app = express();
app.use(compression()); //Compress all routes
app.use(helmet());
app.use(session({
  secret: 'E_Invoice',
  esave: true,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());


// Add headers
app.use(function (req, res, next) {
  
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');
  
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
  
      // Pass to next layer of middleware
      next();
  });

// var url = 'mongodb://beshr:beshr@ds241395.mlab.com:41395/headstart';
var url2 = 'mongodb://localhost:27017/E_Invoice';
mongoose.connect(url2);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { console.log("Connected correctly to server"); });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// externalip(function (err,  ip ) {
//   console.log( " externalip" , ip); // => 8.8.8.8
// });

// app.use('/Software', Software);
// app.use('/AI', AI);
// app.use('/Network', Network);
// app.use('/Tags', Tags);
// app.use('/project', Project);
// app.use('/company', company);
// app.use('/counts', Counts);
app.use('/Customer' , Customer)
app.use('/Admin' , Admin)
app.use('/Category' , Category)
app.use('/Product' , Product)
app.use('/Seller' , Seller)
app.use('/Invoice' , Invoice)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.listen(process.env.PORT || port, function () {
//   // var uid = parseInt(process.env.SUDO_UID);
//   // // Set our server's uid to that user
//   // if (uid) process.setuid(uid);
//   // console.log('Server\'s UID is now ' + process.getuid());
// });

app.listen(port, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
// http.createServer(app).listen(port  ,  () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
// https.createServer({ ... }, app).listen(443);


app.use(express.static(__dirname + '/'));