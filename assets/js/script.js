// current day and time
$("#currentDay").text(dayjs().format("dddd, MMMM D YYYY"));
$("#currentTime").text(dayjs().format('HH : mm A'));

// Variables Section
var token = config.apiToken;
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiCityURL = "&appid=" + token
var cityNameEl = document.getElementById("enter-city");
var searchCityEl = document.querySelector("#search-button");
const searchEl = document.getElementById("search-button");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
var historyEl = document.getElementById("history");

// search button function
searchEl.addEventListener("click", function () {
    const searchTerm = cityNameEl.value.trim();
    // getWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("city searches", JSON.stringify(searchHistory));
    // renderSearchHistory();
})

//display search history
displaySearchHistory();
    function displaySearchHistory(){
        historyEl.innerHTML = "";
        for (let i = 0; i < searchHistory.length; i++) {
            const historyList = document.createElement("history");
                historyList.setAttribute("type", "text");
                historyList.setAttribute("value", searchHistory[i]);
                khistoryList.setAttribute("class", "form-control d-block bg-white");
            }
            historyEl.append(history);
        }




//fetch city weather
var getCityWeather = function(){
    let cityNameUrl = cityNameEl;
        fetch(apiUrl + cityNameUrl + apiCityURL).then(function(response){
        response.json().then(function(data){
            console.log(data);
        })
    })
}


// local storage
function citySearchList(){
    if (searchHistory === -1) {
        console.log("need more");
    }
  localStorage.setItem("city", JSON.stringify(cityNameEl));  
}


//searchhistory
searchHistory =[];


getCityWeather();
