// Variables Section
var cityNameEl = "Sorrento";
var stateCodeEl = document.getElementById("enter-state");
var countryEl = document.getElementById("enter-country");
var searchEl = document.getElementById("search-button");
var clearEl = document.getElementById("clear-history");
var nameEl = document.getElementById("city-name");
var currentPicEl = document.getElementById("current-pic");
var currentTempEl = document.getElementById("temperature");
var currentHumidityEl = document.getElementById("humidity");
var currentWindEl = document.getElementById("wind-speed");
var currentUVEl = document.getElementById("UV-index");
var historyEl = document.getElementById("history");
var fivedayEl = document.getElementById("fiveday-header");
var todayweatherEl = document.getElementById("today-weather");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
var token = config.apiToken;

//Fetch to OpenWeather

// Execute a current weather get request from open weather api
var getCityWeather = function(getCity) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityNameEl + "," + stateCodeEl + "," + countryEl + "&appid=" + token;
    fetch(apiUrl).then(function(response){
        response.json().then(function(data) {
             console.log(data);
        })
       
    });

}

getCityWeather();