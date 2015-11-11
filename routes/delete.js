'use strict';

var express = require('express');
var router = express.Router();

var Contact = require('../models/contact.js');

router.post('/', function(req, res){
  var indices = req.body;

  Contact.delete(indices, function(err){
    if (err){
      res.status(400).send(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
