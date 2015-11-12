'use strict';

var express = require('express');
var router = express.Router();

var Contact = require('../models/contact.js');

router.post('/', function(req, res){
  var timestamps = req.body;

  Contact.delete(timestamps, function(err){
    if (err){
      res.status(400).send(err);
    } else {
      // res.redirect('/');
      res.send('deleted selected contacts');
    }
  });
});

module.exports = router;
