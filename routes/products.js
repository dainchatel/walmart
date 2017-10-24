var models = require('../db/models/index');
var express = require('express');
var router = express.Router();
var cors = require('cors');

router.get('/', function(req,res,next) {
    models.Product.findAll().then(products => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      return res.json(products);
    })
});

router.put('/:id', function(req, res, next) {
  console.log(req.body);
  console.log(req.params);
  models.Product.update({
    brand: req.body.brand
  }, { where: { id: req.params.id } }).then((products) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    return res.json(products);
  })
  });



module.exports = router;
