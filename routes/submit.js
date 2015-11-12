'use strict';

var express = require('express');
var router = express.Router();

var Contact = require('../models/contact.js');

router.post('/', function(req, res){
  // data from post will be form submission on index.jade
  var newContact = req.body

  // add contact data to DB using Contact method
  Contact.add(newContact, function(err){
    if (err) {
      res.status(400).send(err);
    } else {
      // res.send(newContact);
      res.redirect('/');
      // res.render('index', {contacts: contactsList})
    }
  });
});

module.exports = router;
