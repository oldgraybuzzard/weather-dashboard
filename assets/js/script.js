var token = config.apiToken;
var cityName = "";
var stateCode = "";
var country = ""
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + stateCode + "," + country + "&appid=" + token;
var fivedayEl = document.getElementById("five-day");
var cityEl = document.getElementById("enter-city");
var searchEl = document.getElementById("search-button");
var clearEl = document.getElementById("clear-history");
var nameEl = document.getElementById("city-name");
var currentPicEl = document.getElementById("current-pic");
var currentTempEl = document.getElementById("temperature");
var currentHumidityEl = document.getElementById("humidity");
var currentWindEl = document.getElementById("wind-speed");
var currentUVEl = document.getElementById("UV-index");
var historyEl = document.getElementById("history");
var todayweatherEl = document.getElementById("today-weather");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];


//Fetch to OpenWeather
fetch (apiUrl).then(response.json()).then(data => console.log(data));

// Search by city, state, country and search button
function cityWeather(city)


// Buttons for quick searches of cities


// Display area of city under search


// Five day weather preview



