// current day and time
$("#currentDay").text(dayjs().format("dddd, MMMM D YYYY"));
$("#currentTime").text(dayjs().format('HH:mm'));

// Variables Section
var token = config.apiToken;
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiCityURL = "&appid=" + token
var cityNameEl = document.getElementById("enter-city");
var searchCityEl = document.querySelector("#search-button");
const searchEl = document.getElementById("search-button");

var historyEl = document.getElementById("history");

// city search
$("#enter-city").keypress(function(event){
    // press enter key
    if (event.keyCode === 13) {
      event.preventDefault();
      $("#search-button").click();
    }
  });

  // city search history
cityList();
function cityList() {
  $("#history").html("");
  var cities = JSON.parse(localStorage.getItem("cities")) || [];
  console.log(cities);
  for (var i = 0; i < cities.length; i++)
    $(".list").append('<li class="list-item">' + cities[i] + "</li>");
  // sets on click for the list of cities in the history list
  $(".list-item").on("click", function () {
    city = $(this).text();
    $("#enter-city").val(city);
    $("#search-button").click();
  });
}
// localStorage
function makeList() {
    var cities = JSON.parse(localStorage.getItem("cities")) || [];
    if (cities.indexOf(city) === -1) {
      cities.push(city);
      console.log(cities);
    }
    localStorage.setItem("cities", JSON.stringify(cities));
    cityList();
  }
  // searching a city
$("#searchBtn").on("click", function () {
    // get the value of the input from user
    city = $("#enter-city").val().trim();
  
    // clear input box
    $("#enter-city").val("");


//fetch city weather
var getCityWeather = function(){
    var cityNameUrl = cityNameEl;
        fetch(apiUrl + cityNameUrl + apiCityURL).then(function(response){
        getCityWeather(response);
        getCityForecast(response);
        makeList(response);
        })
    }

getCityWeather();
