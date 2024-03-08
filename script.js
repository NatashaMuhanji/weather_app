
const apiKey = "7c2aa5e48fed5618acaf438b8821cef0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

let city = document.querySelector("body > div > div.weather > h2");
let temp = document.querySelector("body > div > div.weather > h1");
let humiditty = document.querySelector("body > div > div.weather > div > div:nth-child(1) > div > p.humidity");
let wind = document.querySelector("body > div > div.weather > div > div:nth-child(2) > div > p.wind");
let errorMessage = document.querySelector("body > div > div.error");

const searchBar = document.querySelector("#city_name");
const searchButton = document.querySelector("body > div > div.search > button");

const weatherIcon = document.querySelector("body > div > div.weather > img");

const weatherInfo = document.querySelector("body > div > div.weather");

async function checkWeather(cityName){
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);

    if (response.status == 404){
            errorMessage.style.display = "block";
            weatherInfo.style.display = "none";
    } else {
        var data = await response.json();

        city.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + "°C";
        humiditty.innerHTML = data.main.humidity + "%";
        wind.innerHTML = data.wind.speed + " km/h";
    
        // image updates
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else {
            weatherIcon.src = "images/snow.png";
        }
    
        weatherInfo.style.display = "block";
        errorMessage.style.display = "none";
    }
}

searchButton.addEventListener("click", ()=>{
    checkWeather(searchBar.value);
})

