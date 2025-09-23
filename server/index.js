// Import required packages
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";

// Import utility functions
import { storeInDatabase } from "./utils/database.js";
import { getCoordsFromLocation, getAirQualityData } from "./utils/weather.js";

// Load environment variables
dotenv.config();

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, { cors: { origin: "*" } });

// Middleware
app.use(cors());
app.use(express.json());

// API Route to get air quality data
app.post("/api/air_quality", async (req, res) => {
  let { location, lat, lon } = req.body;

  try {
    // Get coordinates from location name if provided
    if (location) {
      const coords = await getCoordsFromLocation(location);
      lat = coords.lat;
      lon = coords.lon;
      if (!lat || !lon) {
        return res.status(400).json({ error: "Could not find location" });
      }
    } else if (!lat || !lon) {
      return res.status(400).json({ error: "Location or coordinates are required" });
    }

    // Get air quality data
    const airData = await getAirQualityData(lat, lon);
    if (airData) {
      // Store data in the database
      await storeInDatabase(airData);
      res.json(airData);
    } else {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } catch (error) {
    console.error("Error in /api/air_quality:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// Background thread for Socket.IO updates
async function backgroundThread() {
  const lat = 28.6139;
  const lon = 77.2090; // New Delhi

  setInterval(async () => {
    try {
      const data = await getAirQualityData(lat, lon);
      if (data) {
        io.emit("air_quality_update", data);
        console.log("Emitted data via Socket.IO");
      }
    } catch (error) {
      console.error("Error in background thread:", error);
    }
  }, 10000); // every 10 seconds
}

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("Client connected");

  // Start the background thread only once
  if (!app.locals.backgroundStarted) {
    backgroundThread();
    app.locals.backgroundStarted = true;
  }

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});