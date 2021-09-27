var token = config.apiToken;
var cityName = "";
var stateCode = "";
var country = ""
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + stateCode + "," + country + "&appid=" + token;


//Fetch to OpenWeather
fetch (apiUrl).then(response.json()).then(data => console.log(data));
