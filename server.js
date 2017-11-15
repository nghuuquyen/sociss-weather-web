"use strict";
// Excute load environment variable from .env file.
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const weather = require('./lib/WeatherTCPService');
const logger = require('./lib/logger');
const path = require('path');

// Set static content.
app.use('/', express.static('./public'));

app.use('/api/weather', function(req, res) {
  const cityName = req.query.city || '';
  logger.info(`Called API for get weather city ${cityName}`);

  weather.getCityWeather(cityName).then(data => {
    res.writeHead(200, { 'Content-type' : 'application/json' });
    res.write(data);
    res.end();
  });
});

app.use(function renderHomepage(req, res, next) {
  fs.readFile(path.resolve('./public/index.html'), function(data) {
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
  logger.info('Weather TCP Server Host ' + process.env.WEATHER_SERVER_HOST);
  logger.info('Weather TCP Server PORT ' + process.env.WEATHER_SERVER_PORT);
});
