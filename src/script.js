function displayTemperature(response) {
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    let cityElement=document.querySelector("#city");
    cityElement.innerHTML=response.data.name.toUpperCase();
    let descriptionElement=document.querySelector("#description");
    descriptionElement.innerHTML=response.data.weather[0].description;
}


let apiKey = "f2307cbce532cfdeb3168c7d625e3421";
let units="metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Matosinhos&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);