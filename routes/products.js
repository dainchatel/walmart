var models = require('../db/models/index');
var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next) {
    models.Product.findAll().then(products => {
      return res.json(products);
    })
});

router.put('/:id', function(req, res, next) {
  console.log(req.body);
  console.log(req.params);
  models.Product.update({
    brand: req.body.brand
  }, { where: { id: req.params.id } }).then((products) => {
    return res.json(products);
  })
  });



module.exports = router;
