function formatDate(timestamp) {
    let currentDate=new Date(timestamp);
    let date = currentDate.getDate();
    let hours=currentDate.getHours();
        if (hours < 10) {
            hours=`0${hours}`;
        }
    let minutes=currentDate.getMinutes();
        if (minutes < 10) {
            minutes=`0${minutes}`;
        }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[currentDate.getDay()];
    let months = ["Jan", "Fev", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let month = months[currentDate.getMonth()];

    return `${day}, ${date} ${month} ${hours}:${minutes}`;

}

function formatDay (timestamp) {
    let date = new Date(timestamp*1000);
    let day= date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    return days[day];
}

function displayForecast(response) {
    let dailyForecast=response.data.daily;

    let forecastElement=document.querySelector("#forecast");

    let forecastHTML = `<div class= "row">`;
    dailyForecast.forEach(function(forecastDay, index) {
        if (index < 5) {
        forecastHTML= forecastHTML + `
			<div class="col">
				<h3 id="forecast-date">
					 ${formatDay(forecastDay.dt)}
				</h3>
				<img
					src= "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
					alt=""
				/>
				<div class="weather-forecast-temperature">
					<span id="forecast-temperature-min">${Math.round(forecastDay.temp.min)}</span>º|<span id="forecast-temperature-max">${Math.round(forecastDay.temp.max)}</span>º
				</div>
			</div>  
    `;}
        forecastMinTemp = forecastDay.temp.min;
        forecastMaxTemp = forecastDay.temp.max;
    })
    forecastHTML=forecastHTML + `</div>`;  
    forecastElement.innerHTML=forecastHTML;      	  
}

function getForecast (coordinates) {
    let apiKey = "f2307cbce532cfdeb3168c7d625e3421";
    let units="metric";
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${units}&appid=${apiKey}`;

    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    let temperatureElement=document.querySelector("#temperature");
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");
    let feelsLikeElement=document.querySelector("#realfeel");
    let windElement=document.querySelector("#wind");
    let humidityElement=document.querySelector("#humidity");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");

    celciusTemperature = response.data.main.temp;
    feelsTemperature = response.data.main.feels_like;

    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    cityElement.innerHTML=response.data.name.toUpperCase();
    descriptionElement.innerHTML=response.data.weather[0].description;
    feelsLikeElement.innerHTML=Math.round(response.data.main.feels_like);
    windElement.innerHTML=Math.round(response.data.wind.speed);
    humidityElement.innerHTML=Math.round(response.data.main.humidity);
    dateElement.innerHTML=formatDate(response.data.dt * 1000);
    iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute ("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f2307cbce532cfdeb3168c7d625e3421";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  
  axios.get(apiUrl).then(displayTemperature);
}

function search (city) {
    let apiKey = "f2307cbce532cfdeb3168c7d625e3421";
    let units="metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(displayTemperature);
}

function resolveSubmit(event) {
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value.toUpperCase());
}

function showCoords(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function displayFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let feelsLikeElement = document.querySelector("#realfeel");
    let forecastMinElement = document.querySelector("#forecast-temperature-min");
    let forecastMaxElement = document.querySelector("#forecast-temperature-max");
    let fahrenheitTemperature = (celciusTemperature*9)/5+32;
    let fahrenheitFeelTemperature =(feelsTemperature*9)/5+32;
    let forecastMinFahrenheit = (forecastMinTemp*9)/5+32;
    let forecastMaxFahrenheit = (forecastMaxTemp*9)/5+32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    feelsLikeElement.innerHTML = Math.round(fahrenheitFeelTemperature);
    forecastMinElement.innerHTML = Math.round(forecastMinFahrenheit);
    forecastMaxElement.innerHTML = Math.round(forecastMaxFahrenheit);
}

function displayCelciusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let feelsLikeElement = document.querySelector("#realfeel");
    let forecastMinElement = document.querySelector("#forecast-temperature-min");
    let forecastMaxElement = document.querySelector("#forecast-temperature-max");
    temperatureElement.innerHTML=Math.round(celciusTemperature);
    feelsLikeElement.innerHTML=Math.round(feelsTemperature);
    forecastMinElement.innerHTML = Math.round(forecastMinTemp);
    forecastMaxElement.innerHTML = Math.round(forecastMaxTemp);
}

let celciusTemperature = null;
let feelsTemperature = null;
let forecastMinTemp = null;
let forecastMaxTemp = null;

let form=document.querySelector("#search-form");
form.addEventListener ("submit", resolveSubmit);

let button = document.querySelector("#current-city");
button.addEventListener("click", showCoords);

let fahrenheitLink=document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener ("click", displayFahrenheitTemp);

let celciusLink=document.querySelector("#celcius");
celciusLink.addEventListener ("click", displayCelciusTemp);

search("Matosinhos");