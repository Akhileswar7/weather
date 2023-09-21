// Constants
const apiKey = '9b6600d1c70e8dcf322afd639f8efb5e'; // Replace with your API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const searchBox = document.getElementById('search-box');
const searchButton = document.getElementById('search-button');
const weatherInfo = document.getElementById('weather-info');

// Event Listener
searchButton.addEventListener('click', () => {
    const city = searchBox.value.trim();
    if (city !== '') {
        getWeatherData(city);
    }
});

// Function to fetch weather data
async function getWeatherData(city) {
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod === 200) {
        const { name, sys, weather, main } = data;
        const weatherDescription = weather[0].description;
        const temperature = main.temp;
        const country = sys.country;

        const weatherHTML = `
            <h2>${name}, ${country}</h2>
            <p>Weather: ${weatherDescription}</p>
            <p>Temperature: ${temperature}°C</p>
        `;

        weatherInfo.innerHTML = weatherHTML;
    } else {
        weatherInfo.innerHTML = '<p>City not found</p>';
    }
}
