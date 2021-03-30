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

function displayTemperature(response) {
    let temperatureElement=document.querySelector("#temperature");
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");
    let feelsLikeElement=document.querySelector("#realfeel");
    let windElement=document.querySelector("#wind");
    let humidityElement=document.querySelector("#humidity");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");

    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    cityElement.innerHTML=response.data.name.toUpperCase();
    descriptionElement.innerHTML=response.data.weather[0].description;
    feelsLikeElement.innerHTML=Math.round(response.data.main.feels_like);
    windElement.innerHTML=Math.round(response.data.wind.speed);
    humidityElement.innerHTML=Math.round(response.data.main.humidity);
    dateElement.innerHTML=formatDate(response.data.dt * 1000);
    iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute ("alt", response.data.weather[0].description);
}


let apiKey = "f2307cbce532cfdeb3168c7d625e3421";
let city="Matosinhos";
let units="metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);