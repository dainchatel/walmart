var models = require('../db/models/index');
var express = require('express');
var router = express.Router();
var middle = require('../middleware/worker.js');

router.get('/', middle.startUp, function(req,res,next) {
    return res.redirect('/');
});





module.exports = router;
