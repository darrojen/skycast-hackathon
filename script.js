// Replace with your actual API key
const apiKey = '6eae2c85004043478ec191351241411'; // Replace with your WeatherAPI key
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value; // Get the city input from the user
    getWeather(city); // Call the function with the user's input
});

async function getWeather(city) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        displayWeather(data); // Call the function to display weather data
    } catch (error) {
        weatherResult.innerHTML = `<p>${error.message}</p>`; // Display error message
    }
}

function displayWeather(data) {
    const temperature = data.current.temp_c; // Temperature in Celsius
    const weatherDescription = data.current.condition.text; // Weather condition
    const city = data.location.name; // City name

    // Display the weather information in the HTML
    weatherResult.innerHTML = `
        <h2>Weather in ${city}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Condition: ${weatherDescription}</p>
    `;
}
