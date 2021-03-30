function displayTemperature(response) {
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    let cityElement=document.querySelector("#city");
    cityElement.innerHTML=response.data.name.toUpperCase();
    let descriptionElement=document.querySelector("#description");
    descriptionElement.innerHTML=response.data.weather[0].description;
    let feelsLikeElement=document.querySelector("#realfeel");
    feelsLikeElement.innerHTML=Math.round(response.data.main.feels_like);
    let windElement=document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed);
    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML=Math.round(response.data.main.humidity);
}


let apiKey = "f2307cbce532cfdeb3168c7d625e3421";
let units="metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Matosinhos&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);