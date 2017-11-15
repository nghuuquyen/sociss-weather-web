"use strict";

const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

// Set static content.
app.use('/', express.static('./public'));

app.use(function renderHomepage(req, res, next) {
  fs.readFile(__dirname + '/public/index.html', function(data) {
    res.writeHead(200, { 'Content-type':'text/html' });
    res.end(data);
  });
});

app.listen(port, function(err) {
  if(err) {
    console.error('Something error !!');
    console.error(err);
  }

  console.log('App listen on port ' + port);
});
