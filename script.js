const apiKey = "6eae2c85004043478ec191351241411";
const cityInput = document.getElementById("input");
const save = document.querySelector(".save");
const enter = document.querySelector(".local");
const home = document.querySelector(".home");
const highlight = document.querySelector(".highlight");
const welcome = document.querySelector(".welcome");
const loader = document.querySelector(".loading");
const hero = document.querySelector(".hero");
const start = document.querySelector(".start");
const loca = "Abakaliki";

let watchId;
let weatherInterval;
start.addEventListener("click", () => {
  loader.style.display = "block";
  home.style.display = "none";
  welcome.style.display = "none";
  if (!navigator.geolocation) {
    highlight.textContent = "Geolocation is not supported by your browser.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      // const { latitude, longitude } = position.coords;
      loader.style.display = "block";
      home.style.display = "none";
      welcome.style.display = "none";
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${
        cityInput.value !== "" ? cityInput.value : loca
      }`;

      // const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        displayWeather(data);
        loader.style.display = "none";
        home.style.display = "block";

        watchId = navigator.geolocation.watchPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            if (weatherInterval) {
              clearInterval(weatherInterval);
            }
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                break;
              case error.POSITION_UNAVAILABLE:
                break;
              case error.TIMEOUT:
                break;
              default:
                break;
            }
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 1000,
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          break;
        case error.POSITION_UNAVAILABLE:
          break;
        case error.TIMEOUT:
          break;
        default:
          break;
      }
    }
  );
});
function displayWeather(data) {
  console.log({ data });
  const temperature = data.current.temp_c;
  const weatherDescription = data.current.condition.text;
  const city = data.location.name;
  const state = data.location.region;
  const country = data.location.country;
  const longitude = data.location.lon;
  const latitude = data.location.lat;
  const fahrenheit = data.current.temp_f;
  const uv = data.current.uv;
  const windSpeed = data.current.wind_kph;
  const humidity = data.current.humidity;
  const time = data.location.localtime;
  const pressure = data.current.pressure_in;
  const icon = data.current.condition.icon;

  const stat = document.querySelector(".state");
  const region = document.querySelector(".country");
  const temp = document.querySelector(".temp");
  const condit = document.querySelector(".condition");
  const date = document.querySelector(".date");
  const ultra = document.querySelector(".uv");
  const humid = document.querySelector(".humidity");
  const pre = document.querySelector(".pressure");
  const wind = document.querySelector(".wind");
  const cloud = document.querySelector(".weather");

  const tem = temperature + "°C";
  stat.textContent = state;
  region.textContent = country;
  temp.textContent = tem;
  condit.textContent = weatherDescription;
  date.textContent = time;
  ultra.textContent = uv;
  humid.textContent = humidity;
  pre.textContent = pressure;
  wind.textContent = windSpeed;
  // cloud.src = icon;

  const weatherIconMap = {
    clear: "/Images/svg/clear-day.svg",
    "clear-night": "/Images/svg/clear-night.svg",
    sunny: "/Images/svg/sun-hot.svg",
    cloudy: "/Images/svg/cloudy.svg",
    overcast: "/Images/svg/overcast-day.svg",
    "partly cloudy": "/Images/svg/partly-cloudy-day.svg",
    mist: "/Images/svg/mist.svg",
    rain: "/Images/svg/rain.svg",
    snow: "/Images/svg/snow.svg",
    fog: "/Images/svg/fog.svg",
    thunderstorms: "/Images/svg/thunderstorms.svg",
    wind: "/Images/svg/wind.svg",
    hail: "/Images/svg/hail.svg",
    dust: "/Images/svg/dust.svg",
    extreme: "/Images/svg/extreme.svg",
    blizzard: "/Images/svg/extreme-snow.svg",
  };

  const keywordToKeyMap = {
    clear: ["clear", "bright", "sunny"],
    "clear-night": ["clear-night", "night clear"],
    sunny: ["sunny", "hot", "bright sun"],
    cloudy: ["cloudy", "clouds", "overcast"],
    overcast: ["overcast", "gloomy"],
    "partly cloudy": ["partly cloudy", "partly sunny", "some clouds"],
    mist: ["mist", "haze", "foggy mist"],
    rain: ["rain", "showers", "raining"],
    snow: ["snow", "snowing", "partly snow", "snow day"],
    fog: ["fog", "foggy"],
    thunderstorms: ["thunderstorms", "storm", "lightning"],
    wind: ["wind", "breezy", "windy"],
    hail: ["hail", "hailstorm"],
    dust: ["dust", "dusty"],
    extreme: ["extreme", "severe"],
    blizzard: ["blizzard", "heavy snow"],
  };

  function getWeatherIcon(description) {
    const normalizedDesc = description.toLowerCase().trim();

    for (const [key, keywords] of Object.entries(keywordToKeyMap)) {
      if (keywords.some((keyword) => normalizedDesc.includes(keyword))) {
        return weatherIconMap[key];
      }
    }

    return "/Images/svg/clear-day";
  }

  const condition = data.current.condition.text;
  const weatherIcon = getWeatherIcon(condition);
  cloud.src = weatherIcon;
}
function stopWatchingLocation() {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
    console.log("Stopped watching the location.");
  }
  if (weatherInterval) {
    clearInterval(weatherInterval);
  }
}
document.querySelector("#search").addEventListener("submit", async (e) => {
  e.preventDefault();
  loader.style.display = "block";
  home.style.display = "none";
  welcome.style.display = "none";
  const searchString = cityInput.value.trim();
  loader.style.display = "block";
  home.style.display = "none";
  welcome.style.display = "none";
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchString}`;
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    displayWeather(data);
    loader.style.display = "none";
    home.style.display = "block";
  } catch (error) {
    console.error(error);
  }
});
