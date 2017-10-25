
// I hope you'll forgive my brief comments - I just spilled water on my computer 
// So I am typing these with a phone
// This is a fairly standard root server js file
// The '/' route uses the index.html, which loads the react bundle
// The '/products' and '/snapshot' routes have been extracted to the routes folder
// Those routes have a simple GET and res headers for CORS
// The /product route has a PUT for updating the brand as well
// the file is initiated with 'var' instead of 'const' - i would change if i had time


// most important remaining code in src/App.js and src/components/Grid.js


var express = require('express');
var path = require('path');
require('dotenv').config();
var cors = require('cors');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var config = require('./webpack.config');
var products = require('./routes/products');
var snapshot = require('./routes/snapshot');

var app = express();
var compiler = webpack(config);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use('/products', products);
app.use('/snapshot', snapshot);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
