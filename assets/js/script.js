// current day and time
$("#currentDay").text(dayjs().format("dddd, MMMM D YYYY"));
$("#currentTime").text(dayjs().format('HH:mm'));

let city = document.getElementById("enter-city");
let date = new Date();

// Variables Section
var token = "&appid=" + config.apiToken;

$("#enter-city").keypress(function(event) {
  // can press the enter key
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#search-button").click();
  }
});

// populates history on page
listCities();
function listCities() {
  $("#cityList").html("");
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
function listOfCities() {
  var cities = JSON.parse(localStorage.getItem("cities")) || [];
  if (cities.indexOf(city) === -1) {
    cities.push(city);
    console.log(cities);
  }
  localStorage.setItem("city list", JSON.stringify(cities));
  listCities();
}

// Clear History button
   $("#clear-history").on("click", function () {
    localStorage.clear();
    location.reload();
    })

// searching a city
$("#search-button").on("click", function () {
  // get the value of the input from user
  city = $("#enter-city").val();

  // clear input box
  $("#enter-city").val("");

  // full url to call api
  const queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" + city + token;
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    getCurrentConditions(response);
    getCurrentForecast(response);
    listOfCities();
  });

  function getCurrentConditions(response) {
    // get the temperature and convert to fahrenheit
    let tempF = (response.main.temp - 273.15) * 1.8 + 32;
    tempF = Math.floor(tempF);
    // pulling lon and lat for the UVIndex
    var lon = response.coord.lon;
    var lat = response.coord.lat;
    $("#current-city-weather").empty();

    // get and set the content in card
    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body pb-0 pl-2");
    const city = $("<h4>").addClass("card-title").text(response.name);
    const cityDate = $("<h6>")
      .addClass("card-title")
      .text(date.toLocaleDateString("en-US"));
    const temperature = $("<p>")
      .addClass("card-text current-temp")
      .text("Temperature: " + tempF + " °F");
    const humidity = $("<p>")
      .addClass("card-text current-humidity")
      .text("Humidity: " + response.main.humidity + "%");
    const wind = $("<p>")
      .addClass("card-text current-wind")
      .text("Wind Speed: " + response.wind.speed + " MPH");
    const image = $("<img>").attr(
      "src",
      "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
    );
    const UVIndextxt = $("<p>")
      .addClass("card-text font-weight-light small")
      .text("UV Index: 0-4 low(green), 4-7 moderate(yellow), 8-11 high(red)");

    // add to page
    city.append(cityDate, image);
    cardBody.append(city, temperature, humidity, wind, UVIndextxt);
    card.append(cardBody);
    $("#current-city-weather").append(card);

    //   * UV index
    // Pulling lon, lat info to uvIndex
    uvIndex(lon, lat);

    function uvIndex(lon, lat) {
      // SEARCHES
      var UVQuery =
        "https://api.openweathermap.org/data/2.5/uvi?" + token + "&lat=" + lat + "&lon=" + lon;

      $.ajax({
        url: UVQuery,
        method: "GET",
      }).then(function (response) {
        const uvFinal = response.value;
        $("#current-city-weather").append(card);
        const UVbadge = $("<div>")
          .addClass("badge mt-auto")
          .text("UV Index: " + uvFinal);
        $("#current-city-weather").append(UVbadge);
        // then style uvFinal button with below
        if (uvFinal < 4) {
          UVbadge.addClass("badge-pill badge-success");
        } else if (uvFinal < 8) {
          UVbadge.addClass("badge-pill badge-warning");
        } else if (uvFinal < 12) {
          UVbadge.addClass("badge-pill badge-danger");
        } else {
          UVbadge.addClass("badge-pill badge-dark");
        }
      });
    }
  }

  function getCurrentForecast() {
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + token,
      method: "GET",
    }).then(function(response){
      $("#five-day-forecast").empty();

      let results = response.list;
      console.log(response.list);

      for (let i = 0; i < results.length; i++) {
        let day = Number(results[i].dt_txt.split("-")[2].split(" ")[0]);
        let hour = results[i].dt_txt.split("-")[2].split(" ")[1];

        if (results[i].dt_txt.indexOf("12:00:00") !== -1) {
      
          let temp = (results[i].main.temp - 273.15) * 1.8 + 32;
          let tempF = Math.floor(temp);
          const card = $("<div>").addClass(
            "card col-md-2 ml-4 mb-4 text-black"
          );
          const cardBody = $("<div>").addClass("card-body p-3 forecastBody");
          const cityDate = $("<h6>")
            .addClass("card-title")
            .text(dayjs(results[i].dt_txt).format("MM/DD/YYYY"));
          const temperature = $("<p>")
            .addClass("card-text forecastTemp")
            .text("Temperature: " + tempF + " °F");
          const humidity = $("<p>")
            .addClass("card-text forecastHumidity")
            .text("Humidity: " + results[i].main.humidity + "%");
          const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png");
          cardBody.append(cityDate, image, temperature, humidity);
          card.append(cardBody);
          $("#five-day-forecast").append(card);
        }
      }
    });
  }
});
