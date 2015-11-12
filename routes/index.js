'use strict';

var express = require('express');
var router = express.Router();

var Contact = require('../models/contact.js');

// router.get('/', function(req, res){
//   res.render('index');
// });

router.get('/', function(req, res){

  Contact.read(function(err, contactsList){
    if (err){
      res.status(400).send(err);
    } else {
      res.render('index', {contacts: contactsList})
    }
  });

});

module.exports = router;
