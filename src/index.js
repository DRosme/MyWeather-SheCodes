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


function setIcon(code) {
  let urlIcon = `https://openweathermap.org/img/wn/${code}@2x.png`;
  document.querySelector("#iconW").src=urlIcon;
  console.log(urlIcon);
  
}


function displayWeather(response) {
  let currentTemp = response.data.main.temp;
  global = currentTemp;
  let temperature = document.querySelector("#tempActual");
  temperature.innerHTML = Math.round(currentTemp);
 
  //Weather description weatherDesc
  
  let prmi = response.data.weather;
  let currentDescp = prmi[0].description;
  let weatherDesc = document.querySelector("#weatherDesc");
  weatherDesc.innerHTML = currentDescp;
  //Humidity
  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity-city");
  humidity.innerHTML = Math.round(currentHumidity);

  //temp min
  let currentHMinTemp = response.data.main.temp_min;
  let minTemp = document.querySelector("#minTemp-city");
  minTemp.innerHTML = Math.round(currentHMinTemp);
  //temp max
  let currentHMaxTemp = response.data.main.temp_max;
  let maxTemp = document.querySelector("#maxTemp-city");
  maxTemp.innerHTML = Math.round(currentHMaxTemp);

  console.log(response);
  //Wind
  let currentWind= response.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = currentWind;

  setIcon(prmi[0].icon);
}

function searchCityF(city) {
  countrySearch.innerHTML = city;

  //Serch temperature
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}

formSearch.addEventListener("submit", function (event) {
  event.preventDefault();
  searchCity = document.querySelector("#search-city");
  let city = searchCity.value;
  if (city !== ""){
    searchCityF(capitalize(city));
  }
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
  searchCityF(currentCity) 
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  //let apiKey = "7cc6e139312be6o1cb19t94fd0aeff4a";
  //let apiUrl = https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=imperial;
  axios.get(url).then(displayCurrentWeather);
}

let buttonCurrent = document.querySelector("#bCurrent");

buttonCurrent.addEventListener("click", function currentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
});

function displayForecast() {
  let forecastW = document.querySelector("#forecast-w");
  let daysA = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  daysA.forEach(function (day) {
    forecastHtml = forecastHtml + `
        <div class="weather-forecast-day">
          <div class="weather-date">${day}</div>
          <div class="weather-icon">🌥️</div>
          <div class="temperatureGrid">
            <span class="tempMinF"> 7°C</span>
            <span class="secondaryTemp"> 7°C</span>
          </div>
      </div>`;    
  });

  forecastW.innerHTML = forecastHtml;
}


//default
searchCityF("Lima");
displayForecast();