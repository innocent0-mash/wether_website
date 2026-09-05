const API_KEY = "262639762a2b56dc658fa0be50e59950"
let city;
const search = document.querySelector("#searchBtn")
const input = document.querySelector("#cityInput")
input.addEventListener("input",()=>{
    city = input.value;
});
search.addEventListener("click",(e)=>{
        
        e.preventDefault(); 
        getWeather(city);
});

function getWeather(city){
   document.querySelector(".weather").innerHTML= " ";
let URL = `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`

 fetch(URL)
.then((raw) => raw.json())
.then((data)=>{
const weatherCard = document.createElement("div");
weatherCard.className = "weather-card";
const location = document.createElement("div");
location.className = "location";
const cityName = document.createElement("h1");
cityName.id = "cityName";
cityName.textContent = data.location.name;
const date = document.createElement("p");
date.id = "date";
date.textContent =  data.location.localtime;

location.append(cityName, date);

const mainWeather = document.createElement("div");
mainWeather.className = "main-weather";


// Weather Icon
const weatherIcon = document.createElement("div");
weatherIcon.className = "weather-icon";
weatherIcon.textContent = "☀️";


// Temperature section
const temperature = document.createElement("div");
temperature.className = "temperature";

const temp = document.createElement("h2");
temp.id = "temperature";
temp.textContent = data.current.temperature +"°C";

const condition = document.createElement("p");
condition.id = "condition";
condition.textContent = data.current.weather_descriptions
[0];

temperature.append(temp, condition);

mainWeather.append(weatherIcon, temperature);

const weatherDetails = document.createElement("div");
weatherDetails.className = "weather-details";

function createDetail(labelText, id, value) {

    const detail = document.createElement("div");
    detail.className = "detail";

    const label = document.createElement("span");
    label.textContent = labelText;

    const strong = document.createElement("strong");
    strong.id = id;
    strong.textContent = value;

    detail.append(label, strong);

    return detail;
}


// Create details
const feelsLike = createDetail(
    "Feels Like",
    "feelsLike",
    data.current.feelslike +"°C"
);

const humidity = createDetail(
    "Humidity",
    "humidity",
    data.current.humidity + "%"
);

const wind = createDetail(
    "Wind",
    "wind",
     data.current.wind_speed+" km/h"
);

const pressure = createDetail(
    "Pressure",
    "pressure",
     data.current.pressure+" hPa"
);

const visibility = createDetail(
    "Visibility",
    "visibility",
   data.current.visibility+" km"
);

const uvIndex = createDetail(
    "UV Index",
    "uvIndex",
    data.current.uv_index,
);

weatherDetails.append(
    feelsLike,
    humidity,
    wind,
    pressure,
    visibility,
    uvIndex
);

weatherCard.append(
    location,
    mainWeather,
    weatherDetails
);

document.querySelector(".weather").append(weatherCard);
})
}