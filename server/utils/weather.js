import fetch from 'node-fetch';

const API_KEY = process.env.API_KEY || "ab9d53ce200f364c6bef00f89fbaa32e";

/**
 * Get coordinates from a location name.
 * @param {string} locationName - The name of the location.
 * @returns {object} - An object containing the latitude and longitude.
 */
export async function getCoordsFromLocation(locationName) {
  try {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=1&appid=${API_KEY}`;
    const response = await fetch(geoUrl);
    const data = await response.json();
    if (data.length > 0) {
      return { lat: data[0].lat, lon: data[0].lon };
    } else {
      return { lat: null, lon: null };
    }
  } catch (err) {
    console.error("Error getting coordinates:", err);
    return { lat: null, lon: null };
  }
}

/**
 * Get air quality and weather data for a given latitude and longitude.
 * @param {number} lat - The latitude.
 * @param {number} lon - The longitude.
 * @returns {object|null} - The air quality and weather data, or null if an error occurs.
 */
export async function getAirQualityData(lat, lon) {
  try {
    const pollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const pollutionRes = await fetch(pollutionUrl);
    const pollutionData = await pollutionRes.json();

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    const components = pollutionData.list[0].components;
    const aqi = pollutionData.list[0].main.aqi;

    return {
      air_quality: {
        pm25: components.pm2_5 || 0,
        pm10: components.pm10 || 0,
        o3: components.o3 || 0,
        no2: components.no2 || 0,
        so2: components.so2 || 0,
        co: components.co || 0,
        aqi: aqi,
      },
      weather: {
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        visibility: weatherData.visibility || 0,
        wind_speed: weatherData.wind.speed,
        pressure: weatherData.main.pressure,
      },
      location: {
        latitude: lat,
        longitude: lon,
        city: weatherData.name || "Unknown",
      },
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    console.error("Error fetching air quality data:", err);
    return null;
  }
}