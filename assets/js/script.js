var token = config.apiToken;
var cityName = "orlando";
var stateCode = "fl";
var country = "usa"
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + stateCode + "," + country + "&appid=" + token;


//Fetch to OpenWeather
// fetch ('https://api.openweathermap.org/data/2.5/weather?q=orlando,fl,usa&appid=02890bdb99719fad40851d0a9b902f85').then(response.json()).then(data => console.log(data));
fetch (apiUrl).then(response.json()).then(data => console.log(data));
