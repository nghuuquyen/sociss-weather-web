"use strict";

const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const weather = require('./lib/WeatherTCPService');
const logger = require('./lib/logger');

// Set static content.
app.use('/', express.static('./public'));

app.use('/api/weather', function(req, res) {
  const cityName = req.query.city || '';
  logger.info(`Called API for get weather city ${cityName}`);

  weather.getCityWeather(cityName).then(data => {
    res.writeHead(200, { 'Content-type' : 'text/html' });
    res.write(data);
    res.end();
  });
});

app.use(function renderHomepage(req, res, next) {
  fs.readFile(__dirname + '/public/index.html', function(data) {
    res.writeHead(200, { 'Content-type':'text/html' });
    res.end(data);
  });
});

app.listen(port, function(err) {
  if(err) {
    logger.error('Something error !!');
    logger.error(err);
  }

  logger.info('App listen on port ' + port);
});
