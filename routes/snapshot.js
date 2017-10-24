var models = require('../db/models/index');
var express = require('express');
var router = express.Router();
var middle = require('../middleware/worker.js');

router.get('/', middle.startUp, function(req,res,next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    return res.redirect('/');
});





module.exports = router;
