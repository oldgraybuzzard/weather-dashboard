// current day and time
$("#currentDay").text(dayjs().format("dddd, MMMM D YYYY"));
$("#currentTime").text(dayjs().format('HH:mm'));

let city = document.getElementById("enter-city");
let date = new Date();

// Variables Section
var token = "&appid=" + config.apiToken;

$("#enter-city").keypress(function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#search-button").click();
  }
});

// display search history
searchHistory();
  function searchHistory() {
    $("#list-of-cities").html("");
    var cities = JSON.parse(localStorage.getItem("cities")) || [];
      for (var i = 0; i < cities.length; i++)
      $(".list").append('<li class="list-item">' + cities[i] + "</li>");
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
    }
    localStorage.setItem("cities", JSON.stringify(cities));
    searchHistory();
}

// Clear History button
$("#clear-history").on("click", function () {
    localStorage.clear();
    location.reload();
})

// search for a city
$("#search-button").on("click", function () {
    city = $("#enter-city").val().trim();
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
    var tempF = (response.main.temp - 273.15) * 1.8 + 32;
      tempF = Math.floor(tempF);
    var feelLikeTempF = (response.main.feels_like - 273.12) * 1.8 + 32;
        feelLikeTempF = Math.floor(feelLikeTempF);
    var lon = response.coord.lon;
    var lat = response.coord.lat;
    $("#current-city-weather").empty();
        const card = $("<div>").addClass("card");
        const cardBody = $("<div>").addClass("card-body pb-0 pl-2");
        const city = $("<h4>").addClass("card-title fw-bold").text(response.name);
        const cityDate = $("<h6>")
          .addClass("card-title")
          .text(date.toLocaleDateString("en-US"));
        const temperature = $("<p>")
          .addClass("card-text current-temp")
          .text("Temperature: " + tempF + " ??F");
          const feelLikeTemperature = $("<p>")
          .addClass("card-text current-feel-like-temp")
          .text("Feel Like Temperature: " + feelLikeTempF + " ??F");
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
    cardBody.append(city, temperature, feelLikeTemperature, humidity, wind, UVIndextxt);
    card.append(cardBody);
    $("#current-city-weather").append(card);
    uvIndex(lon, lat);

  function uvIndex(lon, lat) {
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
                if (uvFinal < 4) {
                      UVbadge.addClass("badge bg-success");
                    } else if (uvFinal < 8) {
                      UVbadge.addClass("badge bg-warning");
                    } else if (uvFinal < 12) {
                      UVbadge.addClass("badge bg-danger");
                    } else {
                      UVbadge.addClass("badge bg-dark");
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
      $("#five-day-forecast-title").addClass("mt-3 mb-3 ml-2 fw-bold text-decoration-underline").text("5 Day Outlook:");
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
          const cardBody = $("<div>").addClass("card-body p-3 forecastBody bg-secondary");
          const cityDate = $("<h6>")
            .addClass("card-title")
            .text(dayjs(results[i].dt_txt).format("MM/DD/YYYY"));
          const temperature = $("<p>")
            .addClass("card-text forecastTemp")
            .text("Temperature: " + tempF + " ??F");
          const forecastWind = $("<p>")
            .addClass("card-text forecastWind")
            .text("Wind Speed: " + results[i].wind.speed + " MPH");
          const humidity = $("<p>")
            .addClass("card-text forecastHumidity")
            .text("Humidity: " + results[i].main.humidity + "%");
          const forecastPressure = $("<p>")
            .addClass("card-text forecastPressure")
            .text("Pressure: " + results[i].main.pressure + " mBar");
          const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png");
          cardBody.append(cityDate, image, temperature, forecastWind, humidity, forecastPressure);
          card.append(cardBody);
          $("#five-day-forecast").append(card);
        }
      }
    });
  }
});
