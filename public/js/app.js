bindingClickEventToMap();

/**
* @name bindingClickEventToMap
* @description
* Binding click event to map area for handle get information.
*/
function bindingClickEventToMap() {
  var items = document.getElementById("map-areas").children;

  for(var i = 0 ; i < items.length; i ++) {
    items[i].addEventListener('click', showWeather);
  }
}

/**
* @name showWeather
* @description
* Show weather modal of selected city.
*
* @param  {object} event Mouse clicked event.
*/
function showWeather(event) {
  var _cityName = event.target.getAttribute('alt');

  getCityWeather(_cityName, function(httpResponse) {
    alert('Info: ' + httpResponse.responseText);
  });
}

/**
* @name getCityWeather
* @description
* Get city weather by city name.
*
* @param  {string}   cityName City name for get weather
* @param  {Function} cb       callback after got data
*/
function getCityWeather(cityName, cb) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cb(xhttp);
    }
  };

  xhttp.open('GET', '/api/weather?city=' + cityName, true);
  xhttp.send();
}
