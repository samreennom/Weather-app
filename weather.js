const apikey = "ea2ca64b8d79fef233971c1e4f2973b1";

const weatherDataEl = document.getElementById("weather-data")

const cityInputEl = document.getElementById("city-input")

const formEl = document.querySelector("form")

formEl.addEventListener("submit", () => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    console.log(cityValue);
    getweatherData(cityValue);

}
);

async function getweatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        if (!response.ok) {
            throw new Error("Network response was not ok")
        }

        const data = await response.json()

        const temperature = Math.round(data.main.temp)

        const description = data.weather[0].description
        const icon = data.weather[0].icon
        const details = [
            `feels like: ${Math.round(data.main.temp)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/sec`,
        ]

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;

        weatherDataEl.querySelector(".description").textContent = description;
        weatherDataEl.querySelector(".details").innerHTML = details.map((details) =>
            `<div>${details}</div> `)
            .join("");


    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";

        weatherDataEl.querySelector(".description").textContent = "An error happened, please try again later";
        weatherDataEl.querySelector(".details").innerHTML = "";
    }
}


