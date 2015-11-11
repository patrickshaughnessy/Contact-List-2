'use strict';

var PORT = process.env.PORT || 5000;
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/', require('./routes/index'));
app.use('/submit', require('./routes/submit'));
app.use('/contacts', require('./routes/contacts'));
app.use('/delete', require('./routes/delete'));

app.listen(PORT, function(){
  console.log('Listening on port: ' + PORT);
});
