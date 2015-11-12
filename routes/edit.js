'use strict';

var express = require('express');
var router = express.Router();

var Contact = require('../models/contact.js');

router.post('/', function(req, res){
  var data = req.body

  Contact.edit(data, function(err){
    if (err){
      res.status(400).send(err);
    } else {
      // success call
    }
  });
});
