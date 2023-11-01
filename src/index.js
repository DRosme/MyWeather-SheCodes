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
  let uIcon = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${code}.png`;
  document.querySelector("#iconW").src=uIcon;
}


function displayWeather(response) {
  let currentTemp = response.data.temperature.current;
  global = currentTemp;
  let temperature = document.querySelector("#tempActual");
  temperature.innerHTML = Math.round(currentTemp);
 
  //Weather description weatherDesc
  
  let prmi = response.data.condition;
  let currentDescp = prmi.description;
  let weatherDesc = document.querySelector("#weatherDesc");
  weatherDesc.innerHTML = currentDescp;
  //Humidity
  let currentHumidity = response.data.temperature.humidity;
  let humidity = document.querySelector("#humidity-city");
  humidity.innerHTML = Math.round(currentHumidity);

  //Wind
  let currentWind= response.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = currentWind;

  getForecast(response.data.city);
  setIcon(prmi.icon);
}

function searchCityF(city) {
  countrySearch.innerHTML = city;

  //Serch temperature
  let apiKey = "0d3e9ae62a719ct5842b4ceff3d7o146";
  let url =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
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
  let currentCity = response.data.city;
  searchCityF(currentCity) 
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "7cc6e139312be6o1cb19t94fd0aeff4a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

let buttonCurrent = document.querySelector("#bCurrent");

buttonCurrent.addEventListener("click", function currentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
});


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  return days[date.getDay()];  
}

function getForecast(city) {
  //Serch temperature
  let apiKey = "0d3e9ae62a719ct5842b4ceff3d7o146";
  let url =`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
  axios.get(url).then(displayForecast);
}

function displayForecast(response) {
  let forecastW = document.querySelector("#forecast-w");
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml = forecastHtml + `
        <div class="weather-forecast-day">
          <div class="weather-date">${formatDay(day.time)}</div>
          <div class="weather-icon">
            <img src="${day.condition.icon_url}"/>
          </div>
          <div class="temperatureGrid">
            <span class="secondaryTemp"> ${Math.round(day.temperature.maximum)}°C</span>
            <span class="tempMinF"> ${Math.round(day.temperature.minimum)}°C</span>
          </div>
      </div>`;    
      
    }

  });

  forecastW.innerHTML = forecastHtml;
}


//default
searchCityF("Lima");
displayForecast();
