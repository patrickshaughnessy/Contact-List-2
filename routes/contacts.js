'use strict';

var express = require('express');
var router = express.Router();

var Contact = require('../models/contact.js');

router.get('/', function(req, res){
  Contact.read(function(err, data){
    if (err){
      return res.status(400).send(err)
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
