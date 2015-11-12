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

    newContact.timestamp = Date.now();
    contactList.push(newContact);

    var data = JSON.stringify(contactList);

    fs.writeFile('./database/contactsDB.json', data, function(err){
      if (err) return cb(err);
      cb(null);

    });
  });
};

Contact.delete = function(timestamps, cb){
  Contact.read(function(err, contactList){
    if (err) return cb(err);

    // for (var i = indices.checked.length-1; i >=0; i--){
    //   contactList.splice(parseInt(indices.checked[i]), 1);
    // }
    // console.log(timestamps.checked, contactList)

    // contactList = contactList.filter(function(contact){
    //   return timestamps.checked.forEach(function(timestamp){
    //     if (contact.timestamp !== timestamp){
    //       return contact;
    //     }
    //   });
    // });


    timestamps.checked.forEach(function(timestamp){
      contactList = contactList.filter(function(contact){
        if (contact.timestamp.toString() != timestamp.toString()){
          return contact;
        }
      });
    });

    console.log(contactList);
    var data = JSON.stringify(contactList);

    fs.writeFile('./database/contactsDB.json', data, function(err){
      if (err) return cb(err);
      cb(null);
    });
  });
};

Contact.edit = function(edits, cb){
  Contact.read(function(err, contactList){
    if (err) return cb(err);

    // contactList[edits.index][edits.key] = edits.value;

    var contactToEdit = contactList.filter(function(contact) {
        return contact.timestamp == edits.timestamp; // filter out appropriate one
    })[0];
    console.log(contactToEdit);

    contactToEdit[edits.key] = edits.value;


    var data = JSON.stringify(contactList);

    fs.writeFile('./database/contactsDB.json', data, function(err){
      if (err) return cb(err);
      cb(null);
    });
  });
};


module.exports = Contact;
