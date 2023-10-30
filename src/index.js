//In your project, display the current date and time using JavaScript: Tuesday 16:00

let timeNow = document.querySelector("#timeNow");

let date = new Date();
var dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = dayNames[date.getDay()];
let hour = date.getHours();

if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let showTime = `${day} ${hour}:${minutes}`;

timeNow.innerHTML = showTime;

// Values to search
let searchCity = document.querySelector("#search-city");
let formSearch = document.querySelector("#form-search-city");
let countrySearch = document.querySelector("#country-search");

let global = 0; //to save the variable temperature (global)

function displayWeather(response) {
  let currentTemp = response.data.main.temp;
  global = currentTemp;
  let temperature = document.querySelector("#tempActual");
  temperature.innerHTML = Math.round(currentTemp);
}

formSearch.addEventListener("submit", function (event) {
  event.preventDefault();
  let city = searchCity.value;
  countrySearch.innerHTML = city.toUpperCase();

  //Serch temperature
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
});

//Changing units. It was possible :)
let linkCelsius = document.querySelector("#celsius");
let linkFahrenheit = document.querySelector("#fahrenheit");
function changeTemperatureC(event) {
  let temperature = document.querySelector("#tempActual");
  event.preventDefault();
  temperature.innerHTML = Math.round(global);
}

linkCelsius.addEventListener("click", changeTemperatureC);

function changeTemperatureF(event) {
  let temperature = document.querySelector("#tempActual");
  event.preventDefault();
  temperature.innerHTML = Math.floor((global * 9) / 5 + 32);
}

linkFahrenheit.addEventListener("click", changeTemperatureF);

// Code to Current Location
function displayCurrentWeather(response) {
  let currentCity = response.data.name;
  let currentTemperature = response.data.main.temp;
  global = currentTemperature;

  countrySearch.innerHTML = currentCity.toUpperCase();
  let temperature = document.querySelector("#tempActual");
  temperature.innerHTML = Math.round(global);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(url).then(displayCurrentWeather);
}

let buttonCurrent = document.querySelector("#bCurrent");

buttonCurrent.addEventListener("click", function currentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
});
