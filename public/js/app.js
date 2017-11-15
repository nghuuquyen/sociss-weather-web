var WEATHER_CARD_ID = 'WeatherCard';

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

    var weather = coverJSONToObject(httpResponse.responseText);
    if(weather) {
      writeWeatherDataToPopupCard(weather);
      showPopup(event, WEATHER_CARD_ID);
    }
  });
}

function writeWeatherDataToPopupCard(weather) {
  $('#WeatherCard #cityName').text(weather.cityName);
  // Cover C to F, We have C = 5/9 (F – 32)
  $('#WeatherCard #temp').text(Math.ceil((5 / 9) * (weather.temperature - 32)));
  // Cover Mph to Km/h
  $('#WeatherCard #wind').text(Math.ceil(weather.windSpeed * 1.6));
}

function coverJSONToObject(string) {
  try {
    return JSON.parse(string);
  } catch(err) {
    return null;
  }
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

  xhttp.open('GET', '/api/weather?city=' + cityName + ', Việt Nam', true);
  xhttp.send();
}


function closePopup(elementId) {
  $('#' + elementId).hide();
}

function showPopup(e, elementId) {
  $('#' + elementId).show();

  mouseX = e.pageX;
  mouseY = e.pageY;

  //To Get the relative position
  if (this.offsetLeft != undefined) mouseX = e.pageX - this.offsetLeft;
  if (this.offsetTop != undefined) mouseY = e.pageY; - this.offsetTop;

  if (mouseX < 0) mouseX = 0;
  if (mouseY < 0) mouseY = 0;

  windowWidth = $(window).width() + $(window).scrollLeft();
  windowHeight = $(window).height() + $(window).scrollTop();

  var popupWidth = $('div').outerWidth();
  var popupHeight = $('div').outerHeight();

  if (mouseX + popupWidth > windowWidth) {
    popupLeft = mouseX - popupWidth;
  } else {
    popupLeft = mouseX;
  }

  if (mouseY + popupHeight > windowHeight) {
    popupTop = mouseY - popupHeight;
  } else {
    popupTop = mouseY;
  }

  if (popupLeft < $(window).scrollLeft()) {
    popupLeft = $(window).scrollLeft();
  }

  if (popupTop < $(window).scrollTop()) {
    popupTop = $(window).scrollTop();
  }

  if (popupLeft < 0 || popupLeft == undefined) popupLeft = 0;
  if (popupTop < 0 || popupTop == undefined) popupTop = 0;

  $('#' + elementId).offset({
    top: popupTop,
    left: popupLeft
  });
}
