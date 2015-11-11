'use strict';

var fs = require('fs');
var Contact = {};

Contact.read = function(cb){
  fs.readFile('./database/contactsDB.json', function(err, data){
    if (err) return cb(err);
    var contactList = JSON.parse(data);
    cb(null, contactList);
  });
};

Contact.add = function(newContact, cb){
  Contact.read(function(err, contactList){
    if (err) return cb(err);

    contactList.push(newContact);

    var data = JSON.stringify(contactList);

    fs.writeFile('./database/contactsDB.json', data, function(err){
      if (err) return cb(err);
      cb(null);

    });
  });
};

Contact.delete = function(indices, cb){
  Contact.read(function(err, contactList){
    if (err) return cb(err);

    console.log(indices.checked, contactList);
    // indices.checked.forEach(function(index){
    //   contactList.splice(parseInt(index), 1);
    // });
    for (var i = indices.checked.length-1; i >=0; i--){
      console.log('here');
      console.log(parseInt(indices.checked[i]));
      contactList.splice(parseInt(indices.checked[i]), 1);
    }

    var data = JSON.stringify(contactList);

    fs.writeFile('./database/contactsDB.json', data, function(err){
      if (err) return cb(err);
      cb(null);

    });
  });
};


module.exports = Contact;
