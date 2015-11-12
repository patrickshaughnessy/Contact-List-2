'use strict';

var express = require('express');
var router = express.Router();

var Contact = require('../models/contact.js');

router.post('/', function(req, res){
  var edits = req.body
  // res.send(data);

  Contact.edit(edits, function(err){
    if (err){
      res.status(400).send(err);
    } else {
      res.send(edits);
    }
  });
});


module.exports = router;
