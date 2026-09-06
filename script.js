const API_KEY = "2c38ba7265ef726c70670939c1bb9caa"
let city;
const search = document.querySelector("#searchBtn");
const input = document.querySelector("#cityInput");

input.addEventListener("input", () => {

    city = input.value;
});
search.addEventListener("click", (e) => {

    e.preventDefault();
        getWeather(city);
  
    
    
});
window.addEventListener("load", () => {

    navigator.geolocation.getCurrentPosition(async (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url =
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        const city = data[0].name;

        getWeather(city);

    });

});
async function getWeather(city) {
    document.querySelector(".weather").innerHTML = " ";
    // let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

    await fetch(URL)
        .then((raw) => raw.json())
        .then((data) => {
            // console.log(data);
            const weatherCard = document.createElement("div");
            weatherCard.className = "weather-card";
            const location = document.createElement("div");
            location.className = "location";
            const cityName = document.createElement("h1");
            cityName.id = "cityName";
            cityName.textContent = data.name;
            const date = document.createElement("p");
            date.id = "date";
            let today = new Date(data.dt*1000).toString();
            // console.log(today);
            date.textContent = today;

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
            temp.textContent = data.main.temp + "°C";

            const condition = document.createElement("p");
            condition.id = "condition";
            condition.textContent = data.weather[0].description;

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
                data.main.feels_like + "°C"
            );

            const humidity = createDetail(
                "Humidity",
                "humidity",
                data.main.humidity + "%"
            );

            const wind = createDetail(
                "Wind",
                "wind",
                data.wind.speed + " km/h"
            );

            const pressure = createDetail(
                "Pressure",
                "pressure",
                data.main.pressure + " hPa"
            );

            const visibility = createDetail(
                "Visibility",
                "visibility",
                data.visibility + " km"
            );

            // const uvIndex = createDetail(
            //     "UV Index",
            //     "uvIndex",
            //     data.current.uv_index,
            // );

            weatherDetails.append(
                feelsLike,
                humidity,
                wind,
                pressure,
                visibility,
                // uvIndex
            );

            weatherCard.append(
                location,
                mainWeather,
                weatherDetails
            );

            document.querySelector(".weather").append(weatherCard);
        })
}