const net = require('net');
const client = new net.Socket();
const logger = require('./logger');

var HOST = '127.0.0.1';
var PORT = 8000;

/**
* @name getCityWeather
* @description
* Get city weather by city name.
*
* @param  {string} cityName String city name.
* @return {object} weather object
*/
function getCityWeather(cityName) {
  return new Promise((resolve, reject) => {
    client.connect(PORT, HOST, function() {
      logger.info(`Connect to ${HOST} on port ${PORT} for get data`);
      client.setEncoding('utf8');
      client.write(`weather --city="${cityName}"`);
      client.end();
    });

    client.on('data', function(data) {
      logger.info(`Received data from server for ${cityName}`, data);
      // Because first character is lenght of string.
      resolve(data.substring(2));
      // kill client after server's response
      client.destroy();
    });

    client.on('error', function(err) {
      logger.error(err);
      reject(err);
    });

    client.on('close', function() {
      logger.info(`Close connection to ${HOST} on port ${PORT}`);
    });
  });
}


module.exports = {
  getCityWeather : getCityWeather
};
