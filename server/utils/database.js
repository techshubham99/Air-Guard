import sqlite3 from 'sqlite3';

const verboseSqlite3 = sqlite3.verbose();
const db = new verboseSqlite3.Database('air_quality.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// Create the table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS air_quality (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  latitude REAL,
  longitude REAL,
  pm25 REAL,
  pm10 REAL,
  o3 REAL,
  no2 REAL,
  so2 REAL,
  co REAL,
  aqi INTEGER,
  temperature REAL,
  humidity REAL,
  visibility REAL,
  wind_speed REAL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

/**
 * Stores air quality and weather data in the database.
 * @param {object} data - The data to store.
 */
export function storeInDatabase(data) {
  try {
    const { air_quality, weather, location } = data;

    const stmt = db.prepare(
      `INSERT INTO air_quality
      (latitude, longitude, pm25, pm10, o3, no2, so2, co, aqi, temperature, humidity, visibility, wind_speed)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    stmt.run(
      location.latitude,
      location.longitude,
      air_quality.pm25,
      air_quality.pm10,
      air_quality.o3,
      air_quality.no2,
      air_quality.so2,
      air_quality.co,
      air_quality.aqi,
      weather.temperature,
      weather.humidity,
      weather.visibility,
      weather.wind_speed
    );

    console.log("Data stored successfully in database");
  } catch (err) {
    console.error("Error storing in database:", err);
  }
}